<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const config = useRuntimeConfig()

export default {
    data() {
        return {
            vditor: null,
            uploadScene: false,
            fileTypes: [
                "image/gif",
                "image/png",
            ],
            access_token: useCookie('access_token'),
            regexp: /\/(\d+)(?:\.png|\.gif)$/,
            // TODO 图片上传状态显示，避免用户重复操作
            uploadImageStatus: null,
            uploadFiles: []//待上传文件集合
        }
    },
    computed: {

    },
    methods: {
        /* 返回md编辑器HTML文本的HTMLDocument类型 */
        doc() {
            return new DOMParser().parseFromString(this.getHTML(), 'text/html')
        },
        getMarkdown() {
            return this.vditor.getValue()
        },
        getHTML() {
            return this.vditor.getHTML()
        },
        // HACK 不好维护的话可以考虑迁移至blog/new.vue下
        /* 获取前两个段落作为摘要 */
        getAbstract() {
            return this.doc().body.textContent.split('\n\n')?.slice(0, 2).join(' ').substring(0, 120).trim();
        },
        /* 获取第一张符合格式的图片作为封面 */
        getCover() {
            const images = this.doc().querySelectorAll('img')
            const coverImage = Array.from(images).find(image => {
                return this.regexp.test(image?.src)
            })
            return coverImage?.src.match(this.regexp)[1] || '';
        },
        disabled() {
            this.vditor.disabled()
        },
        enable() {
            this.vditor.enable()
        },
        insertValue(str) {
            this.vditor.insertValue(str);
        },
        // XXX 临时方案，我没有确定是否支持多图片上传，这里暂时在上传完一张图片后关闭上传窗口
        /* md编辑器自定义按键功能：上传图片至GitHub仓库 */
        async uploadImage() {
            this.uploadScene = false;
            this.disabled()
            gitContent.auth({
                token: this.access_token,
                owner: config.public.TL_OWNER,
                name: config.public.TL_NAME,
            })
            for (const file of this.uploadFiles) {
                await gitContent.uploadImage(config.public.GHCDN, file).then((url) => {
                    this.insertValue(`![img](${url})`)
                }).then(() => {
                    // this.uploadScene = false
                }).catch((error => {
                    alert(`${file.name} 上传失败`)
                    console.log(error);
                }))
            }
            this.uploadFiles = []
            this.enable()
        },
        // HACK 不知道这样能不能避免上传不正确格式的图片，以及未来可能支持其他图片格式或者压缩文件格式
        /* 上传文件类型认证 */
        validFileType(file) {
            return this.fileTypes.includes(file.type);
        },
        // TODO 功能需要考虑更大的文件
        /* 对传入的文件返回文件大小 */
        returnFileSize(number) {
            if (number < 1024) {
                return `${number} bytes`;
            } else if (number >= 1024 && number < 1048576) {
                return `${(number / 1024).toFixed(1)} KB`;
            } else if (number >= 1048576) {
                return `${(number / 1048576).toFixed(1)} MB`;
            }
        },
        // TODO 创建元素的过程改用vue v-if
        /* 待上传文件预览窗口展示 */
        updateImageDisplay() {
            this.uploadFiles = []
            while (this.$refs.preview.firstChild) {
                this.$refs.preview.removeChild(this.$refs.preview.firstChild);
            }
            const curFiles = this.$refs.input.files;
            if (curFiles.length === 0) {
                const para = document.createElement("p");
                para.textContent = "No files currently selected for upload";
                this.$refs.preview.appendChild(para);
            } else {
                const list = document.createElement("ol");
                this.$refs.preview.appendChild(list);

                for (const file of curFiles) {
                    const listItem = document.createElement("li");
                    const para = document.createElement("p");
                    if (this.validFileType(file)) {
                        para.textContent = `file size: ${this.returnFileSize(
                            file.size,
                        )}\nFile name: ${file.name}`;
                        const image = document.createElement("img");
                        image.src = URL.createObjectURL(file);

                        listItem.appendChild(image);
                        listItem.appendChild(para);
                        this.uploadFiles.push(file)
                        //上传至GitHub
                        // this.uploadImage(file)
                    } else {
                        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
                        listItem.appendChild(para);
                    }
                    list.appendChild(listItem);
                }
                this.$refs.select_file_btn.style.display = 'none'
                if (this.uploadFiles.length) {
                    this.$refs.image_upload_btn.style.display = 'inline'
                    this.$refs.image_upload_btn.textContent = '上传文件'
                } else {
                    this.$refs.image_upload_close_btn.style.display = 'inline'
                    this.$refs.image_upload_btn.textContent = '关闭'
                }
            }
        }
    },
    mounted() {
        /* 顶层this上下文的引用 */
        const ctx = this;
        this.vditor = new Vditor('vditor', {
            input(md) {
                ctx.$emit('inputevent', md)
            },
            "height": window.innerHeight * 2 / 3,
            "icon": "material",
            toolbarConfig: {
                pin: true
            },
            "cache": {
                "enable": false
            },
            "counter": {
                "enable": true//字数统计
            },
            "tab": "\t",
            "placeholder": "请输入内容",
            "value": "",
            "mode": "ir",
            preview: {
                delay: 0,
                markdown: {
                    toc: true,
                    footnotes: true,
                    mark: true,
                    sup: true,
                    sub: true
                },
                actions: [],
                render: {
                    media: false
                }
            },
            toolbar: [
                'emoji',
                'link',
                {
                    name: 'upload1',
                    icon: '<svg><use xlink:href="#vditor-icon-upload"></use></svg>',
                    tip: '上传图片至Github仓库',
                    tipPosition: 'n',
                    click() {
                        ctx.uploadScene = true
                    }
                },
                'undo',
                'redo',
                'edit-mode',
                'fullscreen',
                'preview',
                {
                    name: 'more',
                    toolbar: [
                        'insert-after',
                    ],
                },
            ],
            after() {
                ctx.$emit('onload', ctx.vditor)
            }
        })
    },
    emits: ['inputevent', 'onload']
}
</script>
<template>
    <Scene id="uploads" v-if="uploadScene" @clicklBackground="uploadScene = false">
        <h3>上传图片至Github仓库</h3>
        <div ref="preview" id="preview">
            <p>No files currently selected for upload</p>
        </div>
        <label for="image_uploads" ref="select_file_btn">选择文件</label>
        <label ref="image_upload_btn" style="display: none;" @click="uploadImage">上传文件</label>
        <label ref="image_upload_close_btn" style="display: none;" @click="uploadScene = false">关闭</label>
        <input ref="input" @change="updateImageDisplay" type="file" name="image_uploads" id="image_uploads"
            accept=".png,.gif" multiple>
    </Scene>
    <div id="vditor" />
</template>
<style>
#uploads #preview {
    max-height: calc(60vh + 1.8rem);
    overflow-y: auto;
    /* scrollbar-color: var(--text-link) var(--card-background-color);
    scrollbar-width: thin; */
}

#uploads #image_uploads {

    display: none;
}

#uploads label,
#uploads button {
    display: inline;
    font-size: .875rem;
    padding: .5rem .7rem;
    border-radius: .375rem;
    background-color: var(--text-link);
    color: var(--background-color);
    margin-top: 2rem;
    line-height: 4rem;
}

#uploads label:hover,
#uploads button:hover {
    background-color: #2d5ba3;
    color: white;
}

#uploads label:active,
#uploads button:active {
    background-color: #0d3f8f;
    color: white;
}

#uploads ol {
    margin: 0;
    padding: 0;
}

#uploads li,
#uploads div>p {
    background: #eee;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    list-style-type: none;
    border: 1px solid black;
    white-space: pre
}

#uploads li>p {
    text-overflow: ellipsis;
    display: -webkit-box;
    /* display: flex; */
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
}

#uploads img {
    height: 64px;
    order: 1;
    align-self: center;
    margin: 0 10px;
}

#uploads p {
    line-height: 32px;
    padding-left: 10px;
}
</style>