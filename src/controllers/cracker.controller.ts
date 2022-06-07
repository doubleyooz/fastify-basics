const crack = (req: any, reply: any) => {
    const USERNAME = process.env.USERNAME ? process.env.USERNAME : 'username';
    const URL = process.env.URL ? process.env.URL : '';

    const payload = {
        username: USERNAME,
        password: 'sdasdad',
    };

    postData(URL, payload).then(data => {
        console.log(data);
        reply.code(201).send({ data: data });
    });
};

export default { crack };
