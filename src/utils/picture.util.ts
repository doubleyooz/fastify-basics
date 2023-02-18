function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

export const randomPic = (): Promise<string> => {
    const gender = getRandomInt(2) === 0 ? 'men' : 'women';
    const pic = getRandomInt(100);
    return Promise.resolve(
        `https://randomuser.me/api/portraits/${gender}/${pic}.jpg`,
    );
};
