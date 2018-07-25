Page({
    data:{
        deliveryArr:[
            {
                id:0,
                name:'请选择快递公司'
            },
            {
                id:'jd',
                name:'京东'
            },
            {
                id:'ems',
                name:'EMS'
            },
            {
                id:'shunfeng',
                name:'顺丰'
            },
            {
                id:'yuantong',
                name:'圆通'
            },
            {
                id:'yunda',
                name:'韵达'
            },
        ],
        selectIndex:0,
        inputValue:''
    },
    bindPickerChange:function(e){
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            selectIndex: e.detail.value
        })
    },
    bindOrderInput:function(e){
        console.log('input 输入改变，携带值为', e.detail.value)
        this.setData({
            inputValue: e.detail.value
        })
    },
    submit:function(e){
        let deliveryArr = this.data.deliveryArr;
        let selectIndex = this.data.selectIndex;
        let inputValue  = this.data.inputValue;

        if(!inputValue || selectIndex == 0){
            wx.showToast({
              title: '请选择快递公司及输入订单号！',
              duration: 2000,
              icon:'none'
            })
            return
        }

        let order_id = inputValue;
        let company  = deliveryArr[selectIndex].id;
        let url = `/pages/detail/detail?company=${company}&order_id=${order_id}`;
        wx.navigateTo({ url });
    }
})
