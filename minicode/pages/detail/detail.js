Page({
    data: {
        company:'',
        order_id:'',
        detailList:[],
    },
    onLoad: function(options) {
        let company = options.company;
        let order_id = options.order_id;
        this.getData(company,order_id);
    },
    getData: function(company, order_id){
        let url = 'https://www.kuaidi100.com/query';
        wx.request({
            url,
            data:{
                type:company,
                postid:order_id
            },
            success:(res)=>{
                if(res.data.data.length){
                    this.setData({
                        detailList:res.data.data,
                        order_id:order_id,
                        company:company
                    })
                    this.setStorage(company,order_id);
                }else{
                    console.log(res)
                }
            },
            fail:(err)=>{
                console.log(err)
            }
        })
    },
    setStorage:function(company,order_id){
        console.log(company,order_id)
        let history_data = wx.getStorageSync('history_data') || {};
        history_data[order_id] = company;
        wx.setStorage({ key: 'history_data', data: history_data });
    }
})
