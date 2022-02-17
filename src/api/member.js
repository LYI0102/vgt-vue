import axios from "axios";
export const fetchPosts = () => {
    axios.get("http://localhost:3000/Vgt/vgtserver/member").then((res) => {
        memberList.value = _.chain(res.data).cloneDeep().value();
    });
};
