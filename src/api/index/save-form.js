import ajax from './ajax';
import Interface from './interface';
export default param => {
    const ajaxData = {
        url: Interface.saveAddForm,
        method: 'post'
    };

    return new Promise(resolve => {
        const res = ajax(ajaxData, param);

        resolve(res);
    });
};
