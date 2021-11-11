import { ChangeEvent, useEffect, useState, FormEvent } from 'react';
import { Typography, Input, IconButton, Button } from '@material-ui/core';
import { useQueryParams } from '../../hooks/useQueryParams';
import recycleBinIcon from '../../assets/icons/recycle-bin_white.svg';
import classes from './DashboardName.module.scss';
import { DASHBOARD_PARAM_KEYWORD } from '../../constants';

export const DashboardName = () => {
    const [isBeingNamed, setIsBeingNamed] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const { SetParam, GetParam, DeleteParam } = useQueryParams();

    const BeingNamedHandler = () => {
        setIsBeingNamed(prev => !prev);
    };

    const ChangeNameHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newName = e.target.value;
        setName(newName);
    };

    const DeleteDashboardName = () => {
        DeleteParam(DASHBOARD_PARAM_KEYWORD);
        setName('');
    };

    const EditDashboardName = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setIsBeingNamed(false);
        if (!name) {
            return DeleteDashboardName();
        }
        SetParam(DASHBOARD_PARAM_KEYWORD, name);
    };

    useEffect(() => {
        const dashboardName = GetParam<string>(DASHBOARD_PARAM_KEYWORD) || '';
        setName(dashboardName);
    }, []);

    const renderContent = () => {
        const dashboardName = GetParam<string>(DASHBOARD_PARAM_KEYWORD) || '';
        if (dashboardName && !isBeingNamed) {
            return (
                <>
                    <div className={classes['name-container']}>
                        <Button color="inherit" onDoubleClick={BeingNamedHandler}>
                            <Typography variant="h5">{name}</Typography>
                        </Button>
                        <div className={classes['icons']}>
                            <IconButton onClick={DeleteDashboardName}>
                                <img
                                    src={recycleBinIcon}
                                    style={{ color: 'white' }}
                                    alt="recycle-bin"
                                    className="small-icon"
                                />
                            </IconButton>
                        </div>
                    </div>
                </>
            );
        }
        if (isBeingNamed) {
            return (
                <form onSubmit={EditDashboardName}>
                    <Input
                        autoFocus
                        onBlur={() => EditDashboardName()}
                        className={classes['name-input']}
                        value={name}
                        onChange={ChangeNameHandler}
                    />
                </form>
            );
        }
        return (
            <Button variant="outlined" color="inherit" onClick={() => setIsBeingNamed(true)}>
                Name dashboard
            </Button>
        );
    };
    return <div className="content-center position-relative">{renderContent()}</div>;
};
