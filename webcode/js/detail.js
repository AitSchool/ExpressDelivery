$(function(){
    const detailPage = {
        init:function(){
            // 获取数据
            this.getData();
        },
        getData:function(){
            // 通过 getQuery 方法获取URL 上的 company 和 order_id ;
            let company  = this.getQuery('company');
            let order_id = this.getQuery('order_id');

            // 如果没有其中 一个，显示错误信息，结束函数。
            if(!company || !order_id){
                this.setErrorInfo();
                return
            }
            // 使用 ajax 请求数据，因为跨域的问题，获取的是JSONP的伪造数据。
            $.ajax({
                url: 'https://www.easy-mock.com/mock/5a961cd713b9783e11839f42/example/express_delivery?jsonp_param_name=callback',
                type:'GET',
                data:{
                    company,
                    order_id
                },
                dataType:"jsonp",
                // 请求成功
                success:(data)=>{
                    // 设置页面数据
                    this.setData(data)
                    // 设置本地缓存数据
                    this.setStroage()
                },
                // 请求失败
                error:(error)=>{
                    // 显示错误信息
                    this.setErrorInfo()
                }
            })
        },
        setErrorInfo:function(){
            // 隐藏列表信息部分
            $('.detail-section').hide();
            alert('查询失败！')
        },
        setData: function(data) {
            // 从数据中获取到公司、订单号、流程信息
            let company  = data.company;
            let order_id = data.nu;
            let details  = data.data;
            // 设置公司和订单号到视图
            $('.detail-campany').text(company);
            $('.detail-id').text(order_id);
            // 循环流程信息拼接出我们想要的DOM结构
            let html = '';
            details && details.forEach(detail => {
                let tmp = `<li class="detail-progress-item">
                    <p class="detail-progress-time">时间 ${detail.time}</p>
                    <p class="detail-progress-address">${detail.context}</p>
                </li>`
                html += tmp
            })
            // 把拼接好的信息一起设置到视图上
            $('.detail-progress-list').html(html);
        },
        setStroage: function() {
            // 获取公司和订单信息
            let company  = this.getQuery('company'); 
            let order_id    = this.getQuery('order_id');
            // 从本地存储中获取 history_order 的数据
            let histroyData = localStorage.getItem('history_order');
            // 如果有 history_order 数据的话就把其字符串数据转换成对象，如果没有初始化为空对象。
            histroyData = histroyData ? JSON.parse(histroyData) : {};
            console.log(histroyData) 
            // 设置对象新属性为订单号，值为快递公司
            histroyData[order_id] = company;
            // 把数据转化为字符串
            histroyData = JSON.stringify(histroyData);
            // 把数据设置进本地缓存
            localStorage.setItem('history_order',histroyData); 
        },
        // 获取来源的封装方法
        getQuery:function(name) {
            var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
            if(result == null || result.length < 1){
                return "";
            }
            return result[1];
        }
    }

    detailPage.init();
})