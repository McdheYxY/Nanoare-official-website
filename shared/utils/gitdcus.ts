import { Octokit, App } from "octokit";
interface config {
	client: Octokit;
	owner: string;
	name: string;
}
interface params {
	token: string;
	owner: string;
	name: string;
}
export const gitdcus = {
	repositoryId: null as any,
	config: {
		client: null as any,
		owner: null as any,
		name: null as any,
	},
	check(config: config) {
		if (!config.client || !config.owner || !config.name)
			throw new Error("在调用其他api前请执行正确的auth方法！");
		return config;
	},
	auth(params: params) {
		this.config.client = new Octokit({ auth: params.token });
		this.config.owner = params.owner;
		this.config.name = params.name;
	},
	//查询所有类别
	async queryCategories() {
		const { client, owner, name } = this.check(this.config);
		return client
			.graphql(
				`query DiscussionCategories($owner: String!, $name: String!) {
            repository(owner: $owner, name: $name) {
              discussionCategories(first: 100) {
                  nodes{
                      id
                      name
                      createdAt 
                      emoji 
                      description 
                  }
              }
              id
            }
        }`,
				{
					owner,
					name,
				}
			)
			.then((res: any) => {
				return res.repository.discussionCategories.nodes;
			});
	},
	queryByCategoryId(id: string, options: any) {
		let inOptions = {
			...{
				body: false,
				first: null,
				last: null,
				after: null,
				before: null,
			},
			...options,
		};
		const { client, owner, name } = this.check(this.config);
		return client
			.graphql(
				`query Discussions($id:ID,$owner: String!,$name:String!,$body: Boolean!,$after:String,$before:String,$first:Int,$last:Int){
            repository(owner: $owner, name: $name) {
                discussions(
					after:$after  
					before:$before
                    first:$first
                    last:$last
                    orderBy: { field: CREATED_AT, direction: DESC }
                    categoryId: $id
                ){
                    nodes {
                        author {
                            login
                            url
                            avatarUrl
                        }
                        id
                        number
                        title
                        createdAt
                        updatedAt
                        body @include(if: $body)
                        labels(first: 5) {
                            nodes {
                                id
                                name
                                color
                            }
                        }
                    }
                    pageInfo {
						startCursor
                        hasPreviousPage
                        hasNextPage
                        endCursor
                    }
                    totalCount
                }
            }
        }`,
				{
					id,
					owner,
					name,
					body: inOptions.body,
					after: inOptions.after,
					before: inOptions.before,
					first: inOptions.first,
					last: inOptions.last,
				}
			)
			.then((res: any) => {
				return {
					nodes: res.repository.discussions.nodes,
					pageInfo: res.repository.discussions.pageInfo,
				};
			});
	},
	//通过类别名称查询该类别下所有讨论标题、时间、简介、标签
	async queryByCategoryName(name: string, option: any) {
		return this.queryCategories()
			.then((categories) => {
				return categories?.find((category: any) => category?.name === name)?.id;
			})
			.then((categoryId) => {
				if (!categoryId) return null;
				return this.queryByCategoryId(categoryId, option);
			});
	},
	async queryCategoryId(name: string) {
		return this.queryCategories()
			.then((categories) => {
				return categories?.find((category: any) => category?.name === name)?.id;
			})
			.then((categoryId) => {
				if (!categoryId) return null;
				return categoryId;
			});
	},
	async queryIdByNumber(number: number) {
		return this.queryByNumber(number).then((discussion: any) => {
			return discussion.id;
		});
	},
	async queryByNumber(number: number) {
		const { client, owner, name } = this.check(this.config);
		return client
			.graphql(
				/* GraphQL */ `
					query Discussion($owner: String!, $name: String!, $number: Int!) {
						repository(owner: $owner, name: $name) {
							discussion(number: $number) {
								author {
									login
									url
									avatarUrl
								}
								id
								number
								title
								createdAt
								updatedAt
								url
								body
								labels(first: 5) {
									nodes {
										id
										name
										color
									}
								}
							}
						}
					}
				`,
				{
					owner,
					name,
					number,
				}
			)
			.then((res: any) => {
				return res.repository.discussion;
			});
	},
	//查询所有标签
	async queryLabels() {
		const { client, owner, name } = this.check(this.config);
		return client
			.graphql(
				/* GraphQL */ `
					query AllLabels($owner: String!, $name: String!) {
						repository(owner: $owner, name: $name) {
							labels(first: 100, orderBy: { field: NAME, direction: ASC }) {
								nodes {
									id
									name
									color
								}
							}
						}
					}
				`,
				{
					owner,
					name,
				}
			)
			.then((res: any) => {
				return res.repository.labels.nodes;
			});
	},
	async queryRepositoryId() {
		const { client, owner, name } = this.check(this.config);
		return client
			.graphql(
				/* GraphQL */ `
					query AllLabels($owner: String!, $name: String!) {
						repository(owner: $owner, name: $name) {
							id
						}
					}
				`,
				{
					owner,
					name,
				}
			)
			.then((res: any) => {
				return res.repository.id;
			});
	},
	async addLabelsToLabelable(labelIds: Array<string>, labelableId: string) {
		const { client, owner, name } = this.check(this.config);
		return client
			.graphql(
				`
        mutation AddLabelsToLabelable($addLabelsToLabelableInput: AddLabelsToLabelableInput!){
            addLabelsToLabelable(input: $addLabelsToLabelableInput){
                labelable{
                    labels(first: 100, orderBy: { field: NAME, direction: ASC }){
                        nodes {
                            id
                            name
                            color
                        }
                    }
                }
            }
        }
        `,
				{
					addLabelsToLabelableInput: {
						labelIds,
						labelableId,
					},
				}
			)
			.then((res: any) => {
				return res.addLabelsToLabelable.labelable.labels.nodes;
			});
	},
	async removeLabelsFromLabelable(
		labelIds: Array<string>,
		labelableId: string
	) {
		const { client, owner, name } = this.check(this.config);
		return client
			.graphql(
				`
        mutation RemoveLabelsFromLabelableInput($removeLabelsFromLabelableInput: RemoveLabelsFromLabelableInput!){
            removeLabelsFromLabelable(input: $removeLabelsFromLabelableInput){
                labelable{
                    labels(first: 100, orderBy: { field: NAME, direction: ASC }){
                        nodes {
                            id
                            name
                            color
                        }
                    }
                }
            }
        }
        `,
				{
					removeLabelsFromLabelableInput: {
						labelIds,
						labelableId,
					},
				}
			)
			.then((res: any) => {
				return res.addLabelsToLabelable.labelable.labels.nodes;
			});
	},
	async createDiscussion({
		title,
		body,
		categoryId,
		categoryName,
		labelIds,
	}: {
		title: string;
		body: string;
		categoryId: string;
		categoryName: string;
		labelIds: string;
	}) {
		if (this.repositoryId === null) {
			this.repositoryId = await this.queryRepositoryId();
		}
		if (categoryId && categoryName) {
			throw new Error("categoryId 与 categoryName 只能选择一个");
		}
		if (categoryName) {
			categoryId = await this.queryCategoryId(categoryName);
		}
		const { client, owner, name } = this.check(this.config);
		return client
			.graphql(
				`
    mutation CreateDiscussion($createDiscussionInput: CreateDiscussionInput!){
        createDiscussion(input:$createDiscussionInput){
            discussion{
                author{
                    avatarUrl 
                    login 
                    url 
                }
                id
                body
                createdAt  
            number
            title 
            }
        }
    }
    `,
				{
					createDiscussionInput: {
						body,
						categoryId,
						repositoryId: this.repositoryId,
						title,
					},
				}
			)
			.then((res: any) => {
				if (!labelIds || labelIds?.length === 0)
					return res.createDiscussion.discussion;
				if (labelIds.constructor !== Array)
					throw new Error("labelIds is not Array");
				return this.addLabelsToLabelable(
					labelIds,
					res.createDiscussion.discussion.id
				).then((labels: any) => {
					res.createDiscussion.discussion.labels = labels;
					return res.createDiscussion.discussion;
				});
			});
	},
	async deleteDiscussion(idOrNum: string | number) {
		if (typeof idOrNum !== "string") {
			idOrNum = await this.queryIdByNumber(idOrNum);
		}
		const { client } = this.check(this.config);
		return client
			.graphql(
				`
        mutation DeleteDiscussion($deleteDiscussionInput: DeleteDiscussionInput!){
            deleteDiscussion(input: $deleteDiscussionInput){
                discussion{
                    title 
                }
            }
        }
        `,
				{
					deleteDiscussionInput: {
						id: idOrNum,
					},
				}
			)
			.then((res: any) => {
				return res.deleteDiscussion.discussion;
			});
	},
	// github graphql api还支持分类迁移
	async updateDiscussion({
		body,
		discussionIdOrNum,
		title,
	}: {
		body: string;
		discussionIdOrNum: string | number;
		title: string;
	}) {
		const { client } = this.check(this.config);
		if (typeof discussionIdOrNum == "number") {
			discussionIdOrNum = await this.queryIdByNumber(discussionIdOrNum);
		}
		return client
			.graphql(
				`
        mutation UpdateDiscussion($updateDiscussionInput: UpdateDiscussionInput!){
            updateDiscussion(input: $updateDiscussionInput){
                discussion{
                    title 
                    body
                }
            }
        }
        `,
				{
					updateDiscussionInput: {
						body,
						discussionId: discussionIdOrNum,
						title,
					},
				}
			)
			.then((res: any) => {
				return res.updateDiscussion.discussion;
			});
	},
	async clearLabelsFromLabelable(labelableIdOrNum: string | number) {
		const { client } = this.check(this.config);
		if (typeof labelableIdOrNum == "number") {
			labelableIdOrNum = await this.queryIdByNumber(labelableIdOrNum);
		}
		return client
			.graphql(
				`
        mutation ClearLabelsFromLabelable($clearLabelsFromLabelableInput: ClearLabelsFromLabelableInput!){
            clearLabelsFromLabelable(input: $clearLabelsFromLabelableInput){
                labelable{
                    labels(first: 100, orderBy: { field: NAME, direction: ASC }){
                        nodes {
                            id
                            name
                            color
                        }
                    }
                }
            }
        }
        `,
				{
					clearLabelsFromLabelableInput: {
						labelableId: labelableIdOrNum,
					},
				}
			)
			.then((res: any) => {
				return res.clearLabelsFromLabelable.labelable.labels.nodes;
			});
	},
	async createLabel(name: string, color: string) {
		const { client } = this.check(this.config);
		if (this.repositoryId === null) {
			this.repositoryId = await this.queryRepositoryId();
		}
		return client
			.graphql(
				`
        mutation CreateLabel($createLabelInput: CreateLabelInput!){
            createLabel(input: $createLabelInput){
                label{
                    id
                    name
                    color
                }
            }
        }
        `,
				{
					createLabelInput: {
						color,
						name,
						repositoryId: this.repositoryId,
					},
				}
			)
			.then((res: any) => {
				return res.createLabel.label;
			});
	},
	async deleteLabel(id: string) {
		const { client } = this.check(this.config);
		return client
			.graphql(
				`
        mutation DeleteLabel($deleteLabelInput: DeleteLabelInput!){
            deleteLabel(input: $deleteLabelInput){
                clientMutationId 
            }
        }
        `,
				{
					deleteLabelInput: {
						id,
					},
				}
			)
			.then((res: any) => {
				return res.deleteLabel;
			});
	},
	async deleteLabelByName(name: string) {
		return this.queryLabels()
			.then((labels) => {
				return labels?.find((label: any) => label.name == name)?.id;
			})
			.then((id) => {
				if (!id) throw new Error(`没有叫 ${name} 的label`);
				return this.deleteLabel(id);
			});
	},
	async search(params: any) {
		const { client, owner, name } = this.check(this.config);
		const {
			first = 100,
			body = false,
			bodyHTML = false,
			bodyText = false,
			cursor,
			orderBy,
		} = params;
		let query = `repo:"${owner}/${name}"`;

		const { label, category } = params;
		if (label) {
			query += ` label:"${label}"`;
		}
		if (category) {
			query += ` category:"${category}"`;
		}
		if ("query" in params) {
			query += ` ${params.query}`;
		}
		return client
			.graphql(
				/* GraphQL */ `
					query DiscussionsSearch(
						$queryStr: String!
						$first: Int!
						$body: Boolean!
						$bodyHTML: Boolean!
						$bodyText: Boolean!
						$cursor: String
					) {
						search(
							first: $first
							type: DISCUSSION
							query: $queryStr
							after: $cursor
						) {
							nodes {
								... on Discussion {
									author {
										login
										url
										avatarUrl
									}
									number
									title
									createdAt
									updatedAt
									url
									body @include(if: $body)
									bodyHTML @include(if: $bodyHTML)
									bodyText @include(if: $bodyText)
									labels(first: 5) {
										nodes {
											id
											color
											name
										}
									}
								}
							}
							pageInfo {
								startCursor
								hasPreviousPage
								hasNextPage
								endCursor
							}
							totalCount: discussionCount
						}
					}
				`,
				{
					first,
					cursor,
					body,
					bodyHTML,
					bodyText,
					queryStr: query,
				}
			)
			.then((result: any) => {
				if (orderBy === "createdAt") {
					result.search.nodes.sort((a: any, b: any) =>
						b.createdAt.localeCompare(a.createdAt)
					);
				}
				return result.search.nodes;
			});
	},
};
