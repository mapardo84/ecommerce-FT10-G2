import { Popconfirm, Table, Tag, Tooltip } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../actions/categoriesActions";
import { FaTrashAlt } from "react-icons/fa";

/* 

FALTA HACER EL FILTER EN EL STORE SACANDO EL ELEMENTO DEL ID QUE QUIERO REMOVER
ALGO ASI:
categories.filter((category: any) => category.key !== key);


 */

export interface Category {
  id: number;
  name: string;
  capacity: number;
  description: string;
  details: string[];
  price: number;
  images: string[];
}

export const Categories = () => {
  const columns: any = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Category name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
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
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "name",
      render: (_: undefined, record: { id: number }) =>
        categories.length >= 1 ? (
          <>
            <Tooltip title="Delete">
              <Popconfirm
                placement="left"
                title="Are you sure you want to delete this row?"
                onConfirm={() => handleDelete(record.id)}
              >
                <div>
                  {" "}
                  <FaTrashAlt size="18" color="red" />
                </div>
              </Popconfirm>
            </Tooltip>
          </>
        ) : null,
    },
  ];
  /* const [deleteCategories, setDeleteCategories] = useState<Category>(); */
  const { categories } = useSelector((state: any) => state?.categories);
  /* console.log(categories); */
  const dispatch = useDispatch();

  const handleDelete = (key: React.Key) => {
    /* dispatch(accionquefiltra(key)) */
    /* categories.filter((category: any) => category.key !== key); */
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div>
      Categories admin page
      <Table
        dataSource={categories}
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
        rowKey="id"
        bordered={true}
      />
    </div>
  );
};
