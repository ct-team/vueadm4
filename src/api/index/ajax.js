import Vue from 'vue';

const ajax = (ajaxData, parm) => {
    const newAjaxData = Object.assign({}, ajaxData, parm);

    return new Promise((resolve, reject) => {
        Vue.$dart.http
            .ajax(newAjaxData)
            .then(res => {
                resolve(res);
            })
            .catch(e => {
                reject(e);
            });
    });
};

export default ajax;
