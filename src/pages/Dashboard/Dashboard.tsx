import { useContext } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import { LocationsContext } from '../../context/locations';
import { SnackbarContext } from '../../context/snackbar';
import Location from '../../containers/Location';
import Navbar from '../../containers/Navbar';
import Footer from '../../containers/Footer';
import InputDrawer from '../../containers/InputDrawer';

import css from './Dashboard.module.scss';
import AppModal from '../../containers/AppModal';

const Dashboard = () => {
    const {
        state,
        actions: { CreateFormHandler }
    } = useContext(LocationsContext);
    const {
        state: { isSnackbarOpen, message },
        actions: { SnackbarHandler }
    } = useContext(SnackbarContext);

    const handleKeyDown = (event: any) => {
        if (event.key === '=' || event.key === '+') {
            if (CreateFormHandler) {
                CreateFormHandler();
            }
            event.preventDefault();
        }
    };

    const snackbarHandler = () => {
        if (SnackbarHandler) {
            SnackbarHandler(false);
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex,jsx-a11y/no-static-element-interactions
        <div tabIndex={0} onKeyPress={handleKeyDown} className="wrapper">
            <Navbar />
            <AppModal />
            <div className={css.container}>
                {state.locations &&
                    state.locations.map((props, index) => (
                        <div key={index}>
                            <Location {...props} />
                        </div>
                    ))}
                <InputDrawer visibility={state.hasCreateForm} setVisibility={CreateFormHandler} />
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={isSnackbarOpen}
                autoHideDuration={3}
                message={message || ''}
                action={
                    <>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={snackbarHandler}>
                            x
                        </IconButton>
                    </>
                }
            />
            <Footer />
        </div>
    );
};

export default Dashboard;
