/* eslint-disable */
/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

/**
 *
 *
 * @param {*} props
 * @returns
 */
function MinusSquare(props) {
    return (
        <SvgIcon fontSize='inherit' style={{ width: 14, height: 14 }} {...props}>
            {/* disabled max-len because of the SVG declaration */}
            {/* eslint-disable-next-line max-len */}
            <path d='M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z' />
        </SvgIcon>
    );
}

/**
 *
 *
 * @param {*} props
 * @returns
 */
function PlusSquare(props) {
    return (
        <SvgIcon fontSize='inherit' style={{ width: 14, height: 14 }} {...props}>
            {/* disabled max-len because of the SVG declaration */}
            {/* eslint-disable-next-line max-len */}
            <path d='M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z' />
        </SvgIcon>
    );
}

/**
 *
 *
 * @param {*} props
 * @returns
 */
function TransitionComponent(props) {
    const style = useSpring({
        from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
        to: {
            opacity: props.in ? 1 : 0,
            transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
        },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

TransitionComponent.propTypes = {
    /**
   * Show the component; triggers the enter or exit states
   */
    in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3,
        },
    },
    group: {
        marginLeft: 7,
        paddingLeft: 18,
        borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
    },
    label: {
        backgroundColor: 'inherit !important', // tmkasun: remove !important
        width: '100%',
        paddingLeft: 4,
        position: 'relative',
        '&:hover': {
            backgroundColor: '#ececec8c !important', // tmkasun: remove !important
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 800,
    },
});


/**
 *
 *
 * @export
 * @returns
 */
export default function CustomizedTreeView(props) {
    const { scopes, appMappings } = props;
    const classes = useStyles();
    // const [scopes, setScopes] = useState(
    //     scopesSet.map((s) => ({ ...s, checked: false })),
    // );
    const onCheck = (event) => {
        const { name, checked } = event.target;
        const updatedScopes = scopes.map((scope) => {
            if (scope.Name === name) {
                return { ...scope, checked };
            } else {
                return { ...scope };
            }
        });
        // setScopes(updatedScopes);
    };
    return (
        <TreeView
            className={classes.root}
            defaultExpanded={[0, 3]}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
        >
            <StyledTreeItem nodeId={0} label={`Permissions (${scopes.length})`}>
                <StyledTreeItem nodeId={1} label='Admin'>
                    {scopes
                        .filter(({ Roles }) => Roles === 'admin')
                        .map(({ Name, checked }, index) => (
                            <StyledTreeItem
                                endIcon={(
                                    <Checkbox
                                        checked={checked}
                                        name={Name}
                                        onChange={onCheck}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                )}
                                onLabelClick={() => onCheck({ target: { name: Name, checked: !checked } })}
                                nodeId={index + 10}
                                label={Name}
                            />
                        ))}
                </StyledTreeItem>

                <StyledTreeItem nodeId={2} label='Publisher'>
                    {scopes
                        .filter(
                            ({ Roles }) => Roles.includes('Internal/creator')
                                || Roles.includes('Internal/publisher'),
                        )
                        .map(({ Name, checked }, index) => (
                            <StyledTreeItem
                                endIcon={(
                                    <Checkbox
                                        color='primary'
                                        checked={checked}
                                        name={Name}
                                        onChange={onCheck}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                )}
                                name={Name}
                                onLabelClick={() => onCheck({ target: { name: Name, checked: !checked } })}
                                nodeId={index + 20}
                                label={(
                                    <ListItemText
                                        primary={Name}
                                        secondary={Name}
                                    />
                                )}
                            />
                        ))}
                </StyledTreeItem>

                <StyledTreeItem nodeId={3} label='Devportal'>
                    {scopes
                        .filter(({ Roles }) => Roles.includes('Internal/subscriber'))
                        .map(({ Name, checked }, index) => (
                            <StyledTreeItem
                                endIcon={(
                                    <Checkbox
                                        checked={checked}
                                        name={Name}
                                        onChange={onCheck}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                )}
                                onLabelClick={() => onCheck({ target: { name: Name, checked: !checked } })}
                                nodeId={index + 30}
                                label={(
                                    <ListItemText
                                        primary={Name}
                                        secondary={Name}
                                    />
                                )}
                            />
                        ))}
                </StyledTreeItem>
            </StyledTreeItem>
        </TreeView>
    );
}
