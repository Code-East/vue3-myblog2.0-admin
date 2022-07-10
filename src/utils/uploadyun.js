import CryptoJS from 'crypto-js'

const upyunSignature = (folder) => {
    let policy = window.btoa(JSON.stringify({
        'bucket': 'lxoblog-image',
        'content-length-range': '0,10240000',//文件大小限制
        'save-key': folder + '/{filemd5}{.suffix}',//文件路径
        'expiration': Math.floor(new Date().getTime() / 1000) + 86400//过期时间
    }))
    let signature = CryptoJS.MD5(policy + '&V73udRGfD/c0IRGchoAF0sGcJ1Y=').toString()//此处文件密钥前要添加&符号，容易出错
    return {
        policy: policy,
        signature: signature
    }
}

export { upyunSignature }