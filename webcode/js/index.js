$(function(){
    let indexPage = {
        init:function(){
            this.bind();
        },
        bind:function(){
            $('#submit').on('click',this.submitEvent);
            $('.form-item-input').on('click',this.cleanError);
            $('.form-item-select').on('click',this.cleanError);
        },
        cleanError:function(){
            $(this).next().hide();
        },
        submitEvent:function(e){
            e.preventDefault();
            let order_id = $('.form-item-input').val();
            let company  = $('.form-item-select').val();

            if(!order_id){
                $('.form-item-input').next().show();
            }

            if(!company){
                $('.form-item-select').next().show();
            }

            if(!order_id || !company){
                return
            }

            location.href = `./detail.html?company=${company}&order_id=${order_id}`;
        }
    }

    indexPage.init();
})