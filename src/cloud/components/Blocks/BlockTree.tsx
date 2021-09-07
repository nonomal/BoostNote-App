import React from 'react'
import { mdiTrashCan } from '@mdi/js'
import { Block } from '../../api/blocks'
import styled from '../../../design/lib/styled'
import BlockIcon from './BlockIcon'
import NavigationItem from '../../../design/components/molecules/Navigation/NavigationItem'
import { min } from 'ramda'
import cc from 'classcat'
import { FoldingProps } from '../../../design/components/atoms/FoldingWrapper'
import { blockTitle } from '../../lib/utils/blocks'

interface BlockTreeProps {
  idPrefix?: string
  root: Block & { folding?: FoldingProps; folded?: boolean }
  onSelect: (block: Block) => void
  onDelete?: (block: Block) => void
  active?: Block
  depth?: number
  className?: string
  showFoldEvents?: boolean
}

const BlockTree = ({
  idPrefix,
  root,
  onSelect,
  onDelete,
  depth,
  active,
  className,
  showFoldEvents,
}: BlockTreeProps) => {
  const parentDepth = min(depth || 1, 6)
  return (
    <StyledBlockTree
      className={cc([
        'block__tree',
        root.children.length > 0 && 'block__editor__nav--tree',
        parentDepth === 1 && `block__editor__nav--tree-root`,
        className,
      ])}
      depth={parentDepth}
    >
      <NavigationItem
        folded={showFoldEvents ? root.folded : undefined}
        folding={showFoldEvents ? root.folding : undefined}
        id={`${idPrefix}-block-${root.id}`}
        label={blockTitle(root)}
        active={active && root.id === active.id}
        depth={parentDepth}
        icon={{ type: 'node', icon: <BlockIcon block={root} size={16} /> }}
        labelClick={() => onSelect(root)}
        controls={
          onDelete == null || depth === 0
            ? []
            : [{ icon: mdiTrashCan, onClick: () => onDelete(root) }]
        }
      />
      {(!showFoldEvents || !root.folded) &&
        root.children.length > 0 &&
        (root.children as Block[]).map((child: Block) => (
          <BlockTree
            idPrefix={idPrefix}
            key={child.id}
            root={child}
            onSelect={onSelect}
            onDelete={onDelete}
            active={active}
            depth={parentDepth + 1}
            showFoldEvents={showFoldEvents}
          />
        ))}
    </StyledBlockTree>
  )
}

const StyledBlockTree = styled.div<{ depth: number }>`
  position: relative;
  width: 100%;

  &.block__editor__nav--tree {
    &::before {
      content: '';
      position: absolute;
      width: 1px;
      bottom: 13px;
      left: ${({ depth }) => (depth as number) * 8 + 4}px;
      background: ${({ theme }) => theme.colors.border.second};
      height: calc(100% - 26px);
      z-index: 1;
      pointer-events: none;
      filter: brightness(120%);
    }
  }

  .block__editor__nav--item:first-of-type {
    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 1px;
      background: ${({ theme }) => theme.colors.border.second};
      top: 13px;
      left: ${({ depth }) => (depth as number) * 8 - 4}px;
      z-index: 1;
      pointer-events: none;
      filter: brightness(120%);
    }
  }
`

export default BlockTree