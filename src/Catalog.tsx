/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { PageSection } from '@patternfly/react-core'
import { useMemo } from 'react'
import { CatalogCard, ICatalogCard } from './CatalogCard'
import { Grid } from './Grid'

type CatalogFilterValue = string

interface ICatalogFilterGroup {
    id: string
    label: string
    filters?: ICatalogFilter[]
}

interface ICatalogFilter {
    id?: string
    label?: string
    value: CatalogFilterValue
    filters?: ICatalogFilter[]
}

export function Catalog<T extends object>(props: {
    keyFn: (item: T) => string
    items: T[]
    itemToCardFn: (item: T) => ICatalogCard
    filterGroups?: ICatalogFilterGroup[]
    onBack?: () => void
    cardWidth?: number
    selectItem: (item: T) => void
    unselectItem: (item: T) => void
    isSelected: (item: T) => boolean
}) {
    const { keyFn, items, itemToCardFn, isSelected, selectItem, unselectItem } = props

    const catalogCards = useMemo(() => {
        return (
            <Grid size={props.cardWidth ?? 470}>
                {items.map((item) => (
                    <CatalogCard<T>
                        key={keyFn(item)}
                        item={item}
                        itemToCardFn={itemToCardFn}
                        isSelected={isSelected}
                        selectItem={selectItem}
                        unselectItem={unselectItem}
                    />
                ))}
            </Grid>
        )
    }, [props.cardWidth, items, keyFn, itemToCardFn, isSelected, selectItem, unselectItem])

    return (
        <PageSection style={{ flexGrow: 1 }}>
            {/* <Flex style={{ paddingBottom: 22 }}>
                <span>
                    <b>Cards</b>
                </span>
                <FlexItem grow={{ default: 'grow' }} alignSelf={{ default: 'alignSelfCenter' }}>
                    <Divider />
                </FlexItem>
            </Flex> */}
            <div>{catalogCards}</div>
        </PageSection>
    )
}
