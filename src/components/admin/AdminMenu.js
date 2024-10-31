import { redirectTo } from '../../utils/CommonUtil';
import { getCookie } from '../../utils/CookieUtil';
import { ADMIN_LOGIN_ADDRESS } from '../../utils/PageAddressUtil';
import RequestUtil from '../../utils/RequestUtil';

const flexStyle = { display: 'flex', fontSize: '14px' };
const redStyle = { color: 'red' };
const marginStyle = { marginBottom: '18px' };

const sendLogout = async () => {
    await RequestUtil.get('https://www.boyouquan.com/api/admin/logout', {
        'sessionId': getCookie('sessionId')
    });
};

const logout = () => {
    sendLogout();

    redirectTo(ADMIN_LOGIN_ADDRESS);
}

export default function AdminMenu() {
    return (
        <div className="requests-header" style={marginStyle}>
            <h4 style={redStyle}><a href="/admin/blog-requests/add">提交博客 - 管理页面</a></h4>
            <h4 style={redStyle}><a href="/admin/recommended-posts">推荐文章管理 - 管理页面</a></h4>
            <div style={flexStyle}>
                <p>olzhy</p>
                <p><button onClick={() => logout()}> 退出登录</button></p>
            </div>
        </div>
    )
}