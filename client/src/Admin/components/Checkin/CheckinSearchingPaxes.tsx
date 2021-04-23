import { AutoComplete, Button, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByPaxUuid } from '../../actions/searchBarActions';
export const CheckinSearchingPaxes = ({ setModal, bookingStore, setModalCreateVisible, setPaxes, created }: { setModal: Function, bookingStore: any, setModalCreateVisible: Function, setPaxes: Function, created: string }): JSX.Element => {

    const [search, setSearch] = useState("")

    const dispatch = useDispatch()

    const renderTitle = (title: string) => (
        <span key={title}>
            {title}
        </span>
    );

    let i = 0;

    const renderItem = (title: string | number) => {
        i++
        return ({
            value: `${i}.${title}`,
            label: (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {title}
                </div>
            ),
        });
    }

    const mapeoByUuid = (array: any[]) => {
        return array ? array.map((x) => renderItem(x?.uuid)) : []
    }

    const options = [
        {
            label: renderTitle('By UUID'),
            options: mapeoByUuid(bookingStore?.byLastUuid)
        },
    ];

    useEffect(() => {
        dispatch(getByPaxUuid(search))
    }, [dispatch, search])

    const onSelect = (value: string) => {
        //console.log('onSelect', value);
        let selected = value.split('.')
        setPaxes((e: any) => [...e, { id: bookingStore?.byLastUuid[0]?.id, firstName: bookingStore?.byLastUuid[0]?.first_name, lastName: bookingStore?.byLastUuid[0]?.last_name }])
        message.success('Added ' + bookingStore?.byLastUuid[0]?.first_name)
        //setModal(false)
    };

    const onChange = (value: string) => {
        setSearch(value)
    }

    const handleCreate = () => {
        setModal(false)
        setModalCreateVisible(true)
    }

    return (
        <>
            {
                created && created
            }
            <br />
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{
                    width: 300,
                }}
                options={options}
                onSelect={onSelect}
                onSearch={onChange}
                value={search}
            >
                <Input.Search size="large" placeholder="Search Pax" onSearch={onSelect} />
            </AutoComplete>
            <br />
            <br />
            <Button type="primary" onClick={handleCreate}>Create</Button>
        </>
    )
}
