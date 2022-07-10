export const rulesObj = {
    username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 5, max: 12, message: "用户名长度必须在5-12之间", trigger: "blur" },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 12, message: "密码长度必须在6-11之间", trigger: "blur" },
    ],
    nickname: [
        { required: true, message: "请输入昵称", trigger: "blur" },
        { min: 3, max: 10, message: "昵称长度必须在3-10之间", trigger: "blur" },
    ],
    email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
        {
            type: "email",
            message: "请输入正确的邮箱格式",
            trigger: ["blur", "change"],
        },
    ],
}