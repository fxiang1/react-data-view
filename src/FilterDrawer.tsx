/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Checkbox, DrawerPanelBody, DrawerPanelContent, DrawerSection, Stack, Title } from '@patternfly/react-core'
import { useCallback } from 'react'
import { IDataFilter, IFilterState, SetFilterValues } from './DataFilter'

export function FilterDrawer<T extends object>(props: {
    filters: IDataFilter<T>[]
    filterState: IFilterState
    setFilterValues: SetFilterValues<T>
}) {
    const { filters, filterState, setFilterValues } = props
    const toggleFilterValue = useCallback(
        (filter: IDataFilter<T>, filterValues: string[] | undefined, option: string) => {
            if (filterValues?.includes(option)) {
                setFilterValues(
                    filter,
                    filterValues.filter((o) => o !== option)
                )
            } else {
                setFilterValues(filter, [...(filterValues ?? []), option])
            }
        },
        [setFilterValues]
    )
    return (
        <DrawerPanelContent minSize="250px" defaultSize="250px" maxSize="250px">
            <DrawerPanelBody>
                <Title headingLevel="h2" style={{ paddingBottom: 24 }}>
                    Filters
                </Title>
                {filters.map((filter) => {
                    const filterValues = filterState[filter.label]
                    return (
                        <DrawerSection key={filter.label} style={{ paddingBottom: 32 }}>
                            <Stack hasGutter>
                                <Title headingLevel="h4">{filter.label}</Title>
                                {filter.options.map((option) => (
                                    <Checkbox
                                        key={option.label}
                                        id={option.label}
                                        isChecked={filterValues?.includes(option.value)}
                                        onChange={() => toggleFilterValue(filter, filterValues, option.value)}
                                        label={option.label}
                                    />
                                ))}
                            </Stack>
                        </DrawerSection>
                    )
                })}
            </DrawerPanelBody>
        </DrawerPanelContent>
    )
}
