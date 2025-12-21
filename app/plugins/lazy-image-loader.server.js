export default defineNuxtPlugin((nuxtApp)=>{
    nuxtApp.vueApp.directive('imgloader',{
        /* 
        如果您注册 Vue 指令，则必须在客户端和服务器端都注册它，
        除非您只在一侧渲染时使用它。如果指令只在客户端有意义，
        您始终可以将其移动到 ~/plugins/my-directive.client.ts，
        并在 ~/plugins/my-directive.server.ts 中为服务器提供一个“存根”指令
        */
        
    })
})