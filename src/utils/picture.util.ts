function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export const randomPic = async () => {
    let gender = getRandomInt(2) === 0 ? 'men' : 'women';

    let pic = getRandomInt(100);
    return `https://randomuser.me/api/portraits/${gender}/${pic}.jpg`;
};
