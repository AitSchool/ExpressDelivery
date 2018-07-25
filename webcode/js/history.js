$(function(){
    let historyPage = {
        init:function(){
            // 获取数据
            this.getStorage();
        },
        getStorage:function(){
            // 获取本地存储中 history_order 的数据。
            let histroyData = localStorage.getItem('history_order');
            // 如果数据为空
            if(!histroyData){
                // 提示没有数据
                this.setErrorInfo();
            // 如果有数据
            }else{
                // 字符串数据对象化
                histroyData = JSON.parse(histroyData);
                // 把数据插入
                this.setData(histroyData)
            }
        },
        setData:function(histroyData){
            // 遍历数据拼接我们想要的DOM结构
            let html = '';
            Object.keys(histroyData).forEach( data => {
                let order_id = data;
                let company_id = histroyData[data];

                let tmp = `<tr>
                                <td>${company_id}</td>
                                <td>${order_id}</td>
                            </tr>`;
                html += tmp
            })

            $('.history-section table').html(html)
        },
        setErrorInfo:function(){
            // 隐藏模块
            $('.history-section').hide();
            // 显示提示
            alert('没有数据！')
        },
    }
    historyPage.init();
})