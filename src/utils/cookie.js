const setCookie = (tokens) => {

    document.cookie = `accessToken=${tokens.accessToken}; max-age=${1 * 24 * 60 * 60}`;  //یک روز

    document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${30 * 24 * 60 * 60}`; //یک ماه
}

const getCookie = (cookieName) => {
    // console.log(document.cookie);
    return document.cookie
        .split(';')
        .find((token) => token.trim().split("=")[0] === cookieName)
        ?.split("=")[1];
}

const removeCookie = () => {
    document.cookie = `accessToken=; path=/; max-age=0`;
    document.cookie = `refreshToken=; path=/; max-age=0`;
};


export { setCookie, getCookie, removeCookie };