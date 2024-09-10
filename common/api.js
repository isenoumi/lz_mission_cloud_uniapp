import RequestService from './http.multi.js';
import {
	getEnv
} from '@/common/config/getEnv';


const mainRequest = new RequestService(getEnv('BASE_API_URL'));
console.log('aaa', mainRequest, RequestService);

/********************登陆注册基础相关********************/
export const login = (params = {}) => mainRequest.post('/login', params); //登录
export const bindphone = (params = {}) => mainRequest.post('/user/bind_phone', params); //绑定手机号
export const bindinfo = (params = {}) => mainRequest.post('/user/bind_info', params); //绑定基础信息
export const message = (params = {}) => mainRequest.get('/user/message', params); //获取未读消息
export const points_log = (params = {}) => mainRequest.get('/user/points_log', params); //获取用户积分记录
export const community = (params = {}) => mainRequest.get('/community', params); //获取小区、栋、单元
export const userInfo = (params = {}) => mainRequest.get('/user/info', params); //获取用户信息
/********************客户相关********************/
export const customerregions = (params = {}) => mainRequest.get('/customer/regions', params); //获取以开放区域
export const customerallbyregion = (params = {}) => mainRequest.get('/customer/all_by_region', params); //获取客户列表
export const customerdefaultregion = (params = {}) => mainRequest.get('/customer/default_region', params); //获取默认客户
export const usersave = (params = {}) => mainRequest.post('/user/save', params); //存储客户头像和昵称

/********************督导员相关********************/
export const supervisorbindinfo = (params = {}) => mainRequest.post('/supervisor/bind_info', params); //绑定基础信息
export const supervisoruserbindinfo = (params = {}) => mainRequest.post('/supervisor/user_bind_info', params); //绑定基础信息
export const supervisortaskqrcode = (params = {}) => mainRequest.get('/supervisor/task/qrcode',
	params); //生成二维码

export const supervisortasksaveanswer = (params = {}) => mainRequest.post('/supervisor/task/save_answer',
	params); //获取已开放区域
/********************任务********************/
// export const tasklist = (params = {}) => mainRequest.get('/supervisor/task/list', params); //任务列表
export const tasklist = (params = {}) => mainRequest.get('/supervisor/dist/task/list', params); //任务列表
export const taskone = (params = {}) => mainRequest.get('/supervisor/task/one', params); //任务详情
export const taskaccept = (params = {}) => mainRequest.post('/supervisor/task/accept', params); //接受任务
export const tasksuccess = (params = {}) => mainRequest.post('/supervisor/task/success', params); //完成任务

/********************文化********************/
export const culturalist = (params = {}) => mainRequest.get('/cultura/list', params); //文化知识列表
export const culturalistbycustomer = (params = {}) => mainRequest.get('/cultura/list_by_customer', params); //根据客户文化知识列表
// export const culturalistbycustomer = (params = {}) => mainRequest.get('/mission_b/mission/bkbCulturalKnowledge/xcxlist', params); //根据客户文化知识列表
export const knowledge = (params = {}) => mainRequest.get('/cultura/knowledge', params); //知识详情
export const knowledges = (params = {}) => mainRequest.get('/mission_b/mission/bkbKnowledge/queryById', params); //知识详情
/********************宣教********************/
export const educationone = (params = {}) => mainRequest.get('/education/one', params); //宣教知识列表
export const educationchoiceqst = (params = {}) => mainRequest.get('/education/choiceqst', params); //知识详情
export const educationsaveanswer = (params = {}) => mainRequest.post('/education/save_answer', params); //保存宣教答题
export const educationuserbindinfo = (params = {}) => mainRequest.post('/education/user_bind_info', params); //保存宣教答题

/********************课程********************/
export const courselist = (params = {}) => mainRequest.get('/course/list', params); //课程列表
export const courselistbycustomer = (params = {}) => mainRequest.get('/course/list_by_customer', params); //课程列表
export const courseone = (params = {}) => mainRequest.get('/course/one', params); //课程详情
export const coursechoiceqst = (params = {}) => mainRequest.get('/course/choiceqst', params); //课程题库
export const saveanswer = (params = {}) => mainRequest.post('/course/save_answer', params); //保存课程答题
export const courseknowledgeread = (params = {}) => mainRequest.post('/course/knowledge_read', params); //课程学习

/********************活动管理********************/
export const activitylist = (params = {}) => mainRequest.get('/activity/list', params); //活动列表
// export const activityone = (params = {}) => mainRequest.get('/activity/one', params); //活动详情
export const activityone = (params = {}) => mainRequest.get('/activity/oneNew', params); //活动详情
/********************评论管理********************/
export const commentlist = (params = {}) => mainRequest.get('/comment/list', params); //评论列表
export const commentone = (params = {}) => mainRequest.get('/comment/one', params); //评论详情
export const commentsave = (params = {}) => mainRequest.post('/comment/save', params); //保存评论

/********************预约管理********************/
export const bookadd = (params = {}) => mainRequest.post('/2/book/add', params); //预约

/********************演讲员相关********************/
export const speechoractivitymylist = (params = {}) => mainRequest.get('/2/speechor/activity/mylist', params); //活动列表（未结束）
export const speechoractivityendlist = (params = {}) => mainRequest.get('/2/speechor/activity/endlist',
	params); //活动列表（已结束）
export const speechoractivityaccept = (params = {}) => mainRequest.get('/2/speechor/activity/accept', params); // 接受
export const speechoractivitystart = (params = {}) => mainRequest.get('/2/speechor/activity/start', params); // 开始
export const speechoractivityend = (params = {}) => mainRequest.get('/2/speechor/activity/end', params); // 结束
export const speechoractivityqrcode = (params = {}) => mainRequest.get('/speechor/activity/qrcode', params); //生成小程序码
export const speechoractivitycommentlist = (params = {}) => mainRequest.get('/speechor/activity/commentlist',
	params); //评论列表
export const speechoractivitysavePhoto = (config = {}) => mainRequest.upload('/speechor/activity/savePhoto',
	config); //拍照


/********************消息管理********************/
export const messagelist = (params = {}) => mainRequest.get('/notice/list', params); //活动列表
export const messageone = (params = {}) => mainRequest.get('/notice/one', params); //活动详情
/********************积分管理********************/
export const ranking = (params = {}) => mainRequest.get('/ranking', params); //获取积分排名
export const view_click = (params = {}) => mainRequest.post('/view_click', params); //点击文章获取积分
export const add_points = (params = {}) => mainRequest.post('/user/add_points', params); //获取积分