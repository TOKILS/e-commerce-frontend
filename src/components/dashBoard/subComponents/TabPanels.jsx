const TabPanels = (props) => {
    const { tabItem, listArr } = props;
    const TabPanel = (props) => {
        const { idx, item, tabItem } = props;
        return (
            <div key={idx} className="dashBoardTab" role="tabpanel" hidden={tabItem !== idx}>
                {tabItem === idx && item.content}
            </div>
        );
    };
    return (
        <>
            {listArr.map((item, idx) => {
                return <TabPanel idx={idx} tabItem={tabItem} idx={idx} item={item} />;
            })}
        </>
    );
};

export default TabPanels;
