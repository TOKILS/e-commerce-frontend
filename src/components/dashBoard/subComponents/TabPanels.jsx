const TabPanels = (props) => {
    const { tabItem, listArr } = props;
    return (
        <>
            {listArr.map((item, idx) => {
                return (
                    <div role="tabpanel" key={idx} className="dashBoardTab" hidden={tabItem !== idx} item={item}>
                        {tabItem === idx && item.content}
                    </div>
                );
            })}
        </>
    );
};

export default TabPanels;
