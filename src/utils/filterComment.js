const getChildList = (children) => {
    const arr = [];
    //判断当前是评论是否存在子评论 不存在直接return
    if (children == undefined) return;
    //存在子评论 递归函数
    let joinChild = (children) => {
        //循环子评论
        children.forEach((child) => {
            //加入当前子评论到arr
            arr.push(child);
            //判断当前子评论是否还存在子评论 不存在return
            if (child.child == undefined) return;
            //存在继续递归调用
            joinChild(child.child);
        })
    }
    joinChild(children);

    //返回按时间排序的arr
    return arr.sort((a, b) => {
        return a.create_time - b.create_time;
    });
}

export const filterComment = (comment_list) => {
    //遍历当前评论列表
    comment_list.forEach((comment) => {
        //获取处理后的子评论 只有二级
        comment.child = getChildList(comment.child);
    })
    return comment_list;
}