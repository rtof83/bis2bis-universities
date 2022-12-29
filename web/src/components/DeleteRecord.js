const DeleteRecord = async (id, name, api, getData, path) => {
    if (window.confirm(`Excluir ${name}?`)) {
        await api.delete(`${path}s/${id}`)
        .then(() => getData())
        .catch(e => console.log(e));
    };
};

export default DeleteRecord;
