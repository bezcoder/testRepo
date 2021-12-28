export type ChartOptions = {
    gaugechart:{
        series: [
            {
                name: '',
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 5,
                splitNumber: 5,
                detail: {formatter: '{value}'},
                // detail: {formatter?: string},
                // data: [{value: 4, name: ''}],
                data: any,
                itemStyle: {
                    color: '#1B1B1F'
                },
                axisLine: {
                    lineStyle: {
                      roundCap: true,
                      width: 60,
                      color: [
                        [0.20, '#F2383A'],
                        [0.40, '#FEAF00'],
                        [0.60, '#FEF000'],
                        [0.80, '#9FCC00'],
                        [1, '#1EA614']
                      ]
                    }
                },
                axisTick: {
                    splitNumber: 2,
                    lineStyle: {
                      width: 0,
                      color: '#999'
                    }
                  },
                  splitLine: {
                    length: 12,
                    lineStyle: {
                      width: 0,
                      color: '#999'
                    }
                  },
                  axisLabel: {
                    distance: 30,
                    color: 'transparent',
                    fontSize: 20
                  },
            }
        ]
    } 
}
