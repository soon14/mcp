import mailApply from './views/components/mailApply.vue';
import mailCacheApply from './views/components/mailCacheApply.vue';


let routes = [
	{
		path: '/mailApply',
    component: mailApply,
	},
	{
		path: '/mailCacheApply',
    component: mailCacheApply,
	}
]

export default routes;
