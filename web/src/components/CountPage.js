const CountPage = (action, page, data, setPage) => {
    if (action === 'increase' && page < data.slice(-1)[0].from) {
        setPage(page + 1);
    } else if (action === 'decrease' && page > 1) {
        setPage(page - 1);
    };
};

export default CountPage;
