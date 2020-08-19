<script>
export default {
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  render() {
    const { columns, data } = this;
    return (
      <table>
        <thead>
          <tr>
            {columns.map(col => {
              return col.slots &&
                col.slots.title &&
                this.$slots[col.slots.title] ? (
                this.$slots[col.slots.title]
              ) : (
                <th>{col.title}</th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map(row => {
            return (
              <tr>
                {columns.map(col =>
                  col.scopedSlots &&
                  col.scopedSlots.customRender &&
                  col.key === col.scopedSlots.customRender ? (
                    <td>
                      {this.$scopedSlots[col.scopedSlots.customRender](row)}
                    </td>
                  ) : (
                    <td>{row[col.key]}</td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};
</script>
<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #e9e9e9;
}
table th {
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
table td,
table th {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
</style>
