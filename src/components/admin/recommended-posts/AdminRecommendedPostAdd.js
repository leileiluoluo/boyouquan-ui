import { useState } from "react";
import { redirectTo } from "../../../utils/CommonUtil";
import { getCookie } from "../../../utils/CookieUtil";
import { ADMIN_RECOMMENDED_POSTS_ADDRESS } from "../../../utils/PageAddressUtil";
import RequestUtil from "../../../utils/RequestUtil";

const errorStyle = { marginLeft: '20px', color: '#cb2e58', fontSize: '14px' };

export default function AdminRecommendedPostAdd() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const recommend = async (e) => {
        e.preventDefault();

        const resp = await RequestUtil.post('https://www.boyouquan.com/api/admin/recommended-posts/add', JSON.stringify(formData), {
            'sessionId': getCookie('sessionId'),
            'Content-Type': 'application/json'
        });

        if (resp.status == 'error') {
            setErrorMessage(resp.message);
        } else {
            redirectTo(ADMIN_RECOMMENDED_POSTS_ADDRESS);
        }
    }

    return (
        <div className="blog-requests">
            <form onSubmit={recommend}>
                <div className="requests-form-container">
                    <div className="key-value-entry">
                        <div className="label">
                            <p>文章链接 *</p>
                            {errorMessage ? <p style={errorStyle}>{errorMessage}</p> : ''}
                        </div>
                        <div className="field">
                            <input name="link" id="link" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="key-value-entry">
                        <input type="submit" value="提交" />
                    </div>
                </div>
            </form>
        </div>
    )
}