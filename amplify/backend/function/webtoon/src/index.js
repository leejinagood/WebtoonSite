const axios = require('axios');
const { getConn } = require('./db'); // db 연결 함수 import

exports.handler = async (event) => {
    const { httpMethod, queryStringParameters, headers } = event;
    const redisClient = require('redis').createClient({
        host: "127.0.0.1",
        port: "6379",
        db: "0"
    });

    if (httpMethod === 'GET' && event.path === '/api/webtoons') {
        const conn = await getConn();
        const { pi_vch_condition } = queryStringParameters;

        try {
            const Webtoonkey = `webtoon : ${pi_vch_condition}`;
            let value = await redisClient.get(Webtoonkey);

            if (value) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(JSON.parse(value)),
                };
            } else {
                const [result] = await conn.query('CALL usp_get_Webtoons();');
                const webtoon = result[0];
                for (let i = 0; i < webtoon.length; i++) {
                    const item = webtoon[i];
                    const likeKey = `likes:${item.webtoonID}`;
                    const likeValue = await redisClient.get(likeKey);

                    if (likeValue) {
                        item.likes = JSON.parse(likeValue);
                    } else {
                        await redisClient.set(likeKey, item.totalLikes);
                        item.likes = item.totalLikes;
                    }
                }

                if (pi_vch_condition === 'All') {
                    await redisClient.set(Webtoonkey, JSON.stringify(webtoon));
                    await redisClient.expire(Webtoonkey, 3600);
                } else {
                    const result = webtoon.filter((item) => item.webtoonWeek === pi_vch_condition);
                    await redisClient.set(Webtoonkey, JSON.stringify(result));
                }

                return {
                    statusCode: 200,
                    body: JSON.stringify(webtoon),
                };
            }
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: '서버 오류' }),
            };
        } finally {
            conn.release();
        }
    } else if (httpMethod === 'GET' && event.path === '/api/search') {
        const conn = await getConn();
        const { word } = queryStringParameters;
        const query = 'CALL usp_get_search(?);';

        try {
            const key = `webtoon_search : ${word}`;
            let value = await redisClient.get(key);

            if (value) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(JSON.parse(value)),
                };
            } else {
                const [result] = await conn.query(query, [word]);
                const webtoon = result[0];

                await redisClient.set(key, JSON.stringify(webtoon));

                return {
                    statusCode: 200,
                    body: JSON.stringify(webtoon),
                };
            }
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: '서버 오류' }),
            };
        } finally {
            conn.release();
        }
    } else if (httpMethod === 'GET' && event.path === '/api/category') {
        const conn = await getConn();
        const { word } = queryStringParameters;
        const query = 'CALL usp_get_search_cate(?);';

        try {
            const key = `webtoon_search_category : ${word}`;
            let value = await redisClient.get(key);

            if (value) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(JSON.parse(value)),
                };
            } else {
                const [result] = await conn.query(query, [word]);
                const webtoon = result[0];

                await redisClient.set(key, JSON.stringify(webtoon));

                return {
                    statusCode: 200,
                    body: JSON.stringify(webtoon),
                };
            }
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: '서버 오류' }),
            };
        } finally {
            conn.release();
        }
    }

    return {
        statusCode: 400,
        body: JSON.stringify({ message: '잘못된 요청' }),
    };
};
