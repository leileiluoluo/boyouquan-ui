import { useState } from "react";
import { redirectTo } from "../../../utils/CommonUtil";
import { getCookie } from "../../../utils/CookieUtil";
import { ADMIN_RECOMMENDED_POSTS_ADDRESS } from "../../../utils/PageAddressUtil";
import RequestUtil from "../../../utils/APIRequestUtil";

const errorStyle = { marginLeft: '20px', color: '#cb2e58', fontSize: '14px' };

export default function AdminRecommendedPostAdd() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const recommend = async (e) => {
        e.preventDefault();

        const resp = await RequestUtil.post('/api/admin/recommended-posts', JSON.stringify(formData), {
            'Content-Type': 'application/json',
            'username': getCookie('username'),
            'sessionId': getCookie('sessionId')
        });

        if (resp.status != 201) {
            const respBody = await resp.json();
            setError(respBody);
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
                            {error ? <p style={errorStyle}>{error.message}</p> : ''}
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