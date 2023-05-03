/**
  ColumnTreeView Modal component

  This file is part of convert-pheno-ui

  Last Modified: Apr/28/2023

  Copyright (C) 2022-2023 Ivo Christopher Leist - CNAG (Ivo.leist@cnag.crg.eu)

  License: GPL-3.0 license
*/

import React, { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Collapse,
  IconButton,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";

import { TreeView, TreeItem } from "@mui/lab";
import { ExpandMore, ExpandLess, ChevronRight } from "@mui/icons-material";

const TreeItemWithCheckbox = ({
  nodeId,
  name,
  children,
  checkedBoxes,
  setCheckedBoxes,
  updateParentCheckboxes,
}) => {
  const updateChildCheckboxes = (childrenArray, isChecked, state) => {
    childrenArray.forEach((child) => {
      state[child.nodeId] = isChecked;
      if (child.children) {
        updateChildCheckboxes(child.children, isChecked, state);
      }
    });
  };

  const handleCheckboxChange = (event) => {
    event.stopPropagation();

    const isChecked = event.target.checked;
    const newCheckedBoxes = { ...checkedBoxes, [nodeId]: isChecked };

    if (children) {
      updateChildCheckboxes(children, isChecked, newCheckedBoxes);
    }
    updateParentCheckboxes(nodeId, newCheckedBoxes);
    setCheckedBoxes(newCheckedBoxes);
  };

  const isIndeterminate = useMemo(() => {
    if (!children) {
      return false;
    }
    const childNodeIds = children.map((child) => child.nodeId);
    const checkedChildNodes = childNodeIds.filter((id) => checkedBoxes[id]);
    return (
      checkedChildNodes.length > 0 &&
      checkedChildNodes.length < childNodeIds.length
    );
  }, [children, checkedBoxes]);

  return (
    <TreeItem
      nodeId={nodeId}
      label={
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedBoxes[nodeId] || false}
              onChange={handleCheckboxChange}
              indeterminate={isIndeterminate}
              onClick={(e) => e.stopPropagation()}
            />
          }
          label={name}
        />
      }
    >
      {children?.map((child) => (
        <TreeItemWithCheckbox
          key={child.nodeId}
          {...child}
          checkedBoxes={checkedBoxes}
          setCheckedBoxes={setCheckedBoxes}
          updateParentCheckboxes={updateParentCheckboxes}
        />
      ))}
    </TreeItem>
  );
};

const ColumnsTreeView = (props) => {
  const { colTree, colTreeNodeIds, checkedBoxes, setCheckedBoxes } = props;
  const [expanded, setExpanded] = useState([]);

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? colTreeNodeIds : []
    );
  };

  const handleSelectClick = () => {
    /*
    This function toggles all checkboxes in the ColumnsTreeView component to either checked or unchecked.

    Parameters:
    - checkedBoxes: Object containing checkbox nodeIds as keys and boolean values representing the checked state.

    Functionality:
    - It first checks if all checkboxes are currently unchecked. If so, it sets select to true to check them all.
    - It then checks if all checkboxes are currently checked. If so, it sets select to false to uncheck them all.
    - Finally, it iterates over all checkboxes and sets their value to the select boolean, either checking or unchecking them.
    */

    let select = false;
    const checkedBoxesValues = Object.values(checkedBoxes);
    if (checkedBoxesValues.every((val) => val === false)) {
      select = true;
    } else {
      if (checkedBoxesValues.every((val) => val === true)) {
        select = false;
      } else {
        select = true;
      }
    }
    setCheckedBoxes(
      Object.keys(checkedBoxes).reduce((acc, nodeId) => {
        acc[nodeId] = select;
        return acc;
      }, {})
    );
  };

  const handleNodeToggle = (_, nodeIds) => {
    setExpanded(nodeIds);
  };

  const updateParentCheckboxes = (nodeId, newCheckedBoxes) => {
    const findParent = (tree, nodeId) => {
      for (const item of tree) {
        if (item.children?.some((child) => child.nodeId === nodeId)) {
          return item;
        } else if (item.children) {
          const foundParent = findParent(item.children, nodeId);
          if (foundParent) return foundParent;
        }
      }
      return null;
    };

    const parent = findParent(colTree, nodeId);

    if (!parent) {
      return;
    }
    const parentChildren = parent.children;
    const areAllChildrenChecked = parentChildren.every(
      (child) => newCheckedBoxes[child.nodeId]
    );
    newCheckedBoxes[parent.nodeId] = areAllChildrenChecked;
    updateParentCheckboxes(parent.nodeId, newCheckedBoxes);
  };

  return (
    <>
      <Button onClick={handleExpandClick}>
        {expanded.length === 0 ? "Expand all" : "Collapse all"}
      </Button>
      <Button onClick={handleSelectClick}>
        {Object.values(checkedBoxes).every((val) => val === true)
          ? "Unselect all"
          : "Select all"}
      </Button>
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
        expanded={expanded}
        onNodeToggle={handleNodeToggle}
      >
        {colTree.map((item) => (
          <TreeItemWithCheckbox
            key={item.nodeId}
            {...item}
            checkedBoxes={checkedBoxes}
            setCheckedBoxes={setCheckedBoxes}
            updateParentCheckboxes={updateParentCheckboxes}
          />
        ))}
      </TreeView>
    </>
  );
};

// TODO
// Maybe have one file for all the buttons and then import them here
const StyledNotNowBtn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "black",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledApplyBtn = styled(Button)(({}) => ({
  backgroundColor: "orange",
  color: "black",
  "&:hover": {
    backgroundColor: "orange",
  },
}));

const CollapsableExplanation = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <IconButton onClick={toggleExpand}>
        {expanded ? <ExpandLess /> : <ExpandMore />}
        <Typography>{"Hide/show the explanation"}</Typography>
      </IconButton>
      <Collapse in={expanded}>
        <Typography>
          {
            "The tree view shows the top level fields and preselected subfields."
          }
        </Typography>
      </Collapse>
    </>
  );
};

export default function ColumnsTreeViewModal(props) {
  const {
    open,
    handleClose,
    colTree,
    colTreeNodeIds,
    shownColumns,
    colTreeNodeSelected,
  } = props;
  const [checkedBoxes, setCheckedBoxes] = useState(colTreeNodeSelected);

  useEffect(() => {
    setCheckedBoxes(colTreeNodeSelected);
  }, [colTreeNodeSelected]);

  const checkIfAllUnchecked = () => {
    return Object.values(checkedBoxes).every((val) => val === false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select the columns you want to see in the table</DialogTitle>
      <DialogContent sx={{ height: "auto", width: "auto" }}>
        <CollapsableExplanation />
        <ColumnsTreeView
          colTree={colTree}
          colTreeNodeIds={colTreeNodeIds}
          shownColumns={shownColumns}
          checkedBoxes={checkedBoxes}
          setCheckedBoxes={setCheckedBoxes}
        />
      </DialogContent>
      <DialogActions>
        <StyledNotNowBtn onClick={() => handleClose(null)}>
          Not now
        </StyledNotNowBtn>
        <StyledApplyBtn
          disabled={checkIfAllUnchecked()}
          onClick={() => handleClose(checkedBoxes)}
        >
          Apply Selection
        </StyledApplyBtn>
      </DialogActions>
    </Dialog>
  );
}
