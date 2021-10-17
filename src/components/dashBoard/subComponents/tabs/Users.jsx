// general
import { getUsers } from "../../../../store/dashboard/dashboard.store";
import { useEffect, useState } from "react";

// components
import UsersTable from "./UsersTable";

// styled components
import { LoadingButton } from "@mui/lab";
import { Cached } from "@mui/icons-material";

// redux
import { connect } from "react-redux";

const Users = (props) => {
    // useEffect(() => {
    //     console.log("props.users vvvv");
    //     console.dir(props.users)
    // }, [props.users]);

    const [gettingUsersLoading, setGettingUsersLoading] = useState(false);

    async function handleGettingUsers(e) {
        setGettingUsersLoading(true);
        await props.getUsers();
        setTimeout(() => {
            setGettingUsersLoading(false);
        }, 1000);
    }
    return (
        <>
            <div tabIndex="0" className={props.users.length === 0 ? "allUsers dashboardUsersEmpty" : "allUsers"}>
                <LoadingButton variant="text" loading={gettingUsersLoading} className="refreshUsersBtn" onClick={handleGettingUsers}>
                    <Cached />
                </LoadingButton>
                {props.users.length > 0 ? (
                    <UsersTable users={props.users} />
                ) : (
                    <div className="dashboardUsersEmpty_text">
                        <div className="dashboardUsersEmpty_arrow">➜</div>
                        <h2>No users</h2>
                        <p>Please refresh the users list</p>
                    </div>
                )}
            </div>
        </>
    );
};
const mapStateToProps = (state) => ({
    users: state.dashboard.users,
});

const mapDispatchToProps = { getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(Users);
