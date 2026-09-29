export default class Json {
    constructor(res) {
        this.res = res;
        this.msg = {};

        return new Proxy(this, {
            get: (target, prop, receiver) => {
                if (!(prop in target)) {
                    return (param) => {
                        target.feild(prop, param);
                        return receiver; // نرجع الـ Proxy
                    };
                }

                return target[prop];
            }
        });
    }

    static getObject(res) {
        return new Json(res);
    }

    token(val , age = +process.env.TOKEN_EXPAIRE) {
        const option = {
            maxAge : age ,
            secure :  process.env.NODE_ENV == "development" ? false : true  ,
            httpOnly : true,
            sameSite : "strict"
        }
        this.res.cookie("token" , val , option)
        return this
    }
    status(status) {
        this.res.status(status);
        return this;
    }

    feild(name, param) {
        this.msg = {
            ...this.msg,
            [name]: param
        };

        return this;
    }

    end() {
        this.res.json(this.msg);
        return this.res;
    }
};