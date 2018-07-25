Page({
    data: {
        history_data:{},
    },
    onLoad: function(options) {
        this.getData();
    },
    getData: function(){
        let history_data = wx.getStorageSync('history_data') || {};
        this.setData({ history_data })
    },
    goDetail:function(e){
        let company = e.currentTarget.dataset.company;
        let order_id = e.currentTarget.dataset.order_id;

        console.log(company,order_id)

        let url = `/pages/detail/detail?company=${company}&order_id=${order_id}`;
        wx.navigateTo({ url });

    }
})
