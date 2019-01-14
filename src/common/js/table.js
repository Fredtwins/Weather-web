// 全市
export function cityThead (that) {
  return [
    {
      title: '站名',
      align: 'center',
      key: 'stationname'
    }, {
      title: '温度(℃)',
      align: 'center',
      sortable: true,
      key: 't'
    }, {
      title: '时雨量(mm)',
      align: 'center',
      sortable: true,
      key: 'wd2'
    }, {
      title: '风向',
      align: 'center',
      sortable: true,
      key: 'windChinese'
    }, {
      title: '风速(m/s)',
      align: 'center',
      sortable: true,
      key: 'wf2'
    }
  ]
}

export function showtowthead(that) {
  return [
    {
      title: '站名',
      align: 'center',
      key: 'stationname'
    }, {
      title: '最低温度(℃)',
      align: 'center',
      sortable: true,
      key: 'tmin'
    }, {
      title: '最高温度(℃)',
      align: 'center',
      sortable: true,
      key: 'tmax'
    }, {
      title: '最大阵风(m/s)',
      align: 'center',
      sortable: true,
      key: 'wf3smax'
    }, {
      title: '累积降雨(mm)',
      align: 'center',
      sortable: true,
      key: 'rf'
    }
  ]
}

// 时极值，雨量
export function HourThead (that) {
  return [
    {
      title: '站名',
      align: 'center',
      key: 'stationname',
      width: 100,
      fixed: 'left'
    }, {
      title: '最高气温(℃)',
      align: 'center',
      key: 'tmax',
      sortable: true,
      width: 80
    }, {
      title: '出现时间',
      align: 'center',
      key: 'tmaxtime',
      sortable: true,
      width: 80,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.tmaxtime.slice(11, 16)
          }
        })
      }
    }, {
      title: '最低气温(℃)',
      align: 'center',
      key: 'tmin',
      sortable: true,
      width: 80
    }, {
      title: '出现时间',
      align: 'center',
      key: 'tmintime',
      width: 80,
      sortable: true,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.tmintime.slice(11, 16)
          }
        })
      }
    }, {
      title: '风向',
      align: 'center',
      sortable: true,
      key: 'windChinese',
      width: 80
    }, {
      title: '最大阵风(m/s)',
      align: 'center',
      key: 'wd3smax',
      sortable: true,
      width: 80
    }, {
      title: '出现时间',
      align: 'center',
      key: 'wf3smaxtime',
      sortable: true,
      width: 80,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.wf3smaxtime.slice(11, 16)
          }
        })
      }
    }, {
      title: '雨量',
      align: 'center',
      key: 'r24',
      sortable: true,
      width: 80
    }, {
      title: '更新',
      align: 'center',
      key: 'lasttime',
      sortable: true,
      width: 80,
      render: (h, param) => {
        return h('span', {
          domProps: {
            innerHTML: param.row.lasttime.slice(11, 16)
          }
        })
      }
    }
  ]
}

// 时内五分钟
export function SfiveTime (that) {
  return [
    {
      title: '站名',
      align: 'center',
      key: 'stationname',
      width: 80,
      fixed: 'left'
    }, {
      title: '5',
      align: 'center',
      key: '5',
      sortable: true,
      width: 60
    }, {
      title: '10',
      align: 'center',
      key: '10',
      sortable: true,
      width: 60
    }, {
      title: '15',
      align: 'center',
      key: '15',
      sortable: true,
      width: 60
    }, {
      title: '20',
      align: 'center',
      key: '20',
      sortable: true,
      width: 60
    }, {
      title: '25',
      align: 'center',
      key: '25',
      sortable: true,
      width: 60
    }, {
      title: '30',
      align: 'center',
      key: '30',
      sortable: true,
      width: 60
    }, {
      title: '35',
      align: 'center',
      key: '35',
      sortable: true,
      width: 60
    }, {
      title: '40',
      align: 'center',
      key: '40',
      sortable: true,
      width: 60
    }, {
      title: '45',
      align: 'center',
      key: '45',
      sortable: true,
      width: 60
    }, {
      title: '50',
      align: 'center',
      key: '50',
      sortable: true,
      width: 60
    }, {
      title: '55',
      align: 'center',
      key: '55',
      sortable: true,
      width: 60
    }, {
      title: '60',
      align: 'center',
      key: '60',
      sortable: true,
      width: 60
    }
  ]
}