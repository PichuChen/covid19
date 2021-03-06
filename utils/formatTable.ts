import dayjs from 'dayjs'

const headers = [
  { text: '案例編號', value: '案例編號' },
  { text: '公表日', value: '公表日' },
  { text: '相關地點', value: '相關地點' },
  { text: '境外或是本土', value: '境外或本土' },
  { text: '年代', value: '年代' },
  { text: '性別', value: '性別' },
  { text: '退院※', value: '退院', align: 'center' }
]

type DataType = {
  案例編號: string
  リリース日: string
  居住地: string | null
  相關地點: string | null
  境外或本土: string | null
  年代: string | null
  性別: '男性' | '女性' | string
  退院: '◯' | null
  [key: string]: any
}

type TableDataType = {
  案例編號: DataType['案例編號']
  公表日: string
  居住地: DataType['居住地']
  相關地點: DataType['相關地點']
  境外或本土: DataType['境外或本土']
  年代: DataType['年代']
  性別: DataType['性別'] | '不明'
  退院: DataType['退院']
}

type TableDateType = {
  headers: typeof headers
  datasets: TableDataType[]
}

/**
 * Format for DataTable component
 *
 * @param data - Raw data
 */
export default (data: DataType[]) => {
  const tableDate: TableDateType = {
    headers,
    datasets: []
  }
  data.forEach(d => {
    const TableRow: TableDataType = {
      案例編號: d.id ?? '',
      公表日: dayjs(d['リリース日']).format('M/D') ?? '不明',
      居住地: d['居住地'] ?? '調査中',
      相關地點: d['相關地點'] ?? '',
      境外或本土: d['境外或本土'] ?? '',
      年代: d['年代'] ?? '不明',
      性別: d['性別'] ?? '不明',
      退院: d['退院']
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets
    .sort((a, b) => dayjs(a.公表日).unix() - dayjs(b.公表日).unix())
    .reverse()
  return tableDate
}
