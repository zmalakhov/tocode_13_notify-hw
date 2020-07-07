export default function loadMore (res) {
    const messages = []

    // console.log(res);
    // console.log(res.length);

    // > 3
    if (res.length > 3){
        for (let i = 0; i < 3; i++) {
            res[i].main = true
            messages.push(res[i])
        }
    } else {
        for (let i = 0; i < res.length; i++) {
            res[i].main = true
            messages.push(res[i])
        }
    }

    return messages

}