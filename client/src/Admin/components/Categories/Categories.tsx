import {
  Input,
  Popconfirm,
  Table,
  Tag,
  Tooltip,
  Form,
  InputNumber,
  Button,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  deleteCategory,
  updateCategory,
  createCategory,
} from "../../actions/categoriesActions";
import { SearchOutlined } from "@ant-design/icons";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Modal from "antd/lib/modal/Modal";
import "./categories.less";

export interface Category {
  id: number;
  name: string;
  description: string;
  details: string[];
  price: number;
  images: string[];
}
interface IFields {
  name: string[],
  value: string | number | string[]
}

const campos = [
  { name: ["name"], value: "" },
  { name: ["description"], value: "" },
  { name: ["details"], value: [] },
  { name: ["price"], value: "" },
  { name: ["images"], value: [] },
];

export const Categories = () => {
  const handleSearch = (_: string, confirm: Function) => {
    confirm();
  };

  const handleReset = (clearFilters: Function) => {
    clearFilters();
  };

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [fields, setFields] = useState<IFields[]>(campos);
  const [editId, setEditId] = useState(null);

  const { categories } = useSelector((state: any) => state?.categories);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    const index = categories.find((category: Category) => category.id === id);
    dispatch(deleteCategory(index.id));
  };

  const handleEdit = (id: number) => {
    setIsModalVisible(true);
    const index = categories.find((category: Category) => category.id === id);
    setEditId(index.id);
    setFields([
      { name: ["name"], value: index.name },
      { name: ["description"], value: index.description },
      { name: ["details"], value: index.details },
      { name: ["price"], value: index.price },
      { name: ["images"], value: index.images },
    ]);
  };

  const onFinish = (values: Category) => {
    const data = { ...values, id: editId };
    if (editId) {
      dispatch(updateCategory(data));
    } else {
      dispatch(createCategory(data));
    }
    setIsModalVisible(false);
    setEditId(null);
  };

  const closeModal = () => {
    setFields(campos);
    setIsModalVisible(false);
    setEditId(null);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: Function;
      selectedKeys: string;
      confirm: Function;
      clearFilters: Function;
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 30 }}
          ></Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 60, marginLeft: "52px" }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            style={{ marginLeft: "120px" }}
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: string) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: string, record: any) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    render: (text: string) => text,
  });

  const columns: any = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      defaultSortOrder: "descend",
      sorter: (a: Category, b: Category) => a.id - b.id,
      width: 70
    },
    {
      title: "Category name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      width: 200
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
      width: 500
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      ...getColumnSearchProps("details"),
      render: (details: string[]) => (
        <>
          {details.map((detail: string) => (
            <Tag color="blue" key={detail}>
              {detail}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: Category, b: Category) => a.id - b.id,
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "name",
      render: (_: undefined, record: { id: number }) =>
        categories.length >= 1 ? (
          <>
            <Tooltip title="Edit">
              <span
                className="adminCategories_options"
                onClick={() => handleEdit(record.id)}
              >
                <FaPencilAlt size="18" color="orange" />{" "}
              </span>
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                placement="left"
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.id)}
              >
                <span>
                  {" "}
                  <FaTrashAlt size="18" color="red" />
                </span>
              </Popconfirm>
            </Tooltip>
          </>
        ) : null,
    },
  ];

  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={() => setIsModalVisible(true)}
          className="adminCategories_upbar"
        >
          Create a new category
        </Button>
      </div>
      <Table
        dataSource={categories}
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
        rowKey="id"
        bordered={true}
      />
      <Modal
        title="Create a category"
        visible={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form onFinish={onFinish} fields={fields}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input a name!" }]}
          >
            <Input placeholder="Category Name"></Input>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input placeholder="Description"></Input>
          </Form.Item>
          <Form.Item
            label="Details"
            name="details"
            rules={[{ required: true, message: "Please input the details!" }]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags Mode"
            />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber placeholder="Price" min={1}></InputNumber>
          </Form.Item>
          <Form.Item
            label="Images"
            name="images"
            rules={[{ required: true, message: "Please input the images!" }]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags Mode"
            />
          </Form.Item>
          <div className="adminCategories_btn">
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
      ;
    </div>
  );
};
