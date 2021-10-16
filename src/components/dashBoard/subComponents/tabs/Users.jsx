// general
import { connect } from "react-redux";

// styled components
import { Button } from "@mui/material";

// redux
import { getUsers } from "../../../../store/dashboard/dashboard.store";

const Users = (props) => {
    return (
        <>
            <div className="allUsers">
                <Button onClick={() => props.getUsers()}>Refresh users</Button>
            </div>
        </>
    );
}
const mapStateToProps = state => ({
    users: state.dashboard.users
});

const mapDispatchToProps = { getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(Users);