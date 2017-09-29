<template>
	<section class="container">
		<div class="page_header">
			<div id="title">
				<div class="title-left">

				</div>
				<div id="">
					<span>{{setting.title}}</span>
				</div>
				<div class="btn" v-for="btn in setting.btn">
					<el-button :size="btn.size" :loading="btn.loading" :plain="btn.plain" :type="btn.type" @click="btn.methods.click" class="el-button el-button--primary" :disabled="btn.disabled">
						<i :class="btn.icon" id="icon_btn" :style="'color:' + btn.iconcolor + ';font-size:'+ btn.iconsize + ';'"></i>
						<span style="margin-left: 0px !important;">{{btn.label}}</span>
					</el-button>
				</div>
			</div>
			<div class="right_group">
				<div v-for="search in setting.search">
					<user-search
					   :placeword="search.placeholder"
                       icon="search"
                       v-model="search.val"
                       @search-enter="search.methods.click" class="elInput" :style="'width:'+search.width+';line-height:36px'">
          			</user-search>
				</div>
				
			</div>
		</div>
	</section>
</template>

<script>
	import UserSearch from 'components/awesome/user_search/UserSearch.vue';
	export default {
		name: "CoreHeader",
		data() {
			return {
				btnClick:""
			}
		},
		props: {
			setting: {
				type: Object,
				default() {
					return {
						title: "",
			            btn:[{
								label: "",
								icon:'',
							    iconsize:'',
								iconcolor:'#000000',
								size: "",
								plain: false,
								loading: false,
								disabled: false,
            						type: "button",
								methods:{
							        click:""
							    }
							}
			            ],
			            search:[{
			            			placeholder: "",
								val:'',
							    width:'',
								methods:{
							        click:""
							    }
			            		}
			            ]
					};
				}
			}
		},
		methods: {
			
		},
		mounted: function(){
			
		},components:{
			'user-search': UserSearch
		}
	}
</script>

<style lang="less" scoped>
	.page_header {
		margin-top: 8px;
		height: 59px;
		line-height: 59px;
		font-size: 16px;
		div#title {
			float: left;
			height: 19px;
			div{
				float: left;
			}
			.btn{
				margin-left: 20px;
				button i {
					margin-right: 4px;
					color: #BBBF75;
					font-size: 20px;
				}
			}
			>div:nth-of-type(2) {
				padding-left: 10px;
				color: #21B8D5;
				span {
					font-size: 16px;
					font-weight: bold;
					font-family: PingFang SC, Bold;
				}
			}
			>div:nth-of-type(1) {
				margin-top: 22px;
				display: inline;
				width: 2px;
				height: 14px;
				background-color: #21B8D5;
				/*font-size: 14px;
						border-left: 2px solid #21B8D5;*/
			}
		}
		div.right_group {
			float: right;
			margin-right: 20px;
			div {
				display: inline-block;
				margin-left: 8px;
				#searchBucket {
					line-height: 36px;
					width: 150px;
					height: 36px;
					margin-top: 12px;
					display: inline;
				}
			}
		}
	}
</style>