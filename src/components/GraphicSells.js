import Chart from 'react-google-charts'
import {useState} from "react";
import Select from 'react-select'

export function GraphicSells(){

    //Datos y opciones para las graficas
    var Data = [];
    var LineChartOptions = {};
    var PieChartOptions = {};
    const LineDataTotal = [
      ['', 'No. Ventas'],
      ["Ventas", 300],
      [" ", 0], //Relleno para formato de barras
      [" ", 0], //Relleno para formato de barras
    ];
    const LineChartOptionsTotal = {
      vAxis: {
        title: 'No. Ventas',
      },
      colors: ['green'],
    }

    //Estado controlado por el select del filtro
    const [filter, setFilter] = useState("Semanal");

    //Opciones del select del filtro
    const options = [
      { value: 'Semanal', label: 'Semanal', selected: true},
      { value: 'Mensual', label: 'Mensual' },
      { value: 'Anual', label: 'Anual' }
    ];

    // Define los datos y opciones de las graficas dependiendo del estado del select
    switch(filter){
      case "Semanal":
        Data = [
          ['Dia', 'No. Ventas'],
          ["Lunes", 0],
          ["Martes", 10],
          ["Miercoles", 23],
          ["Jueves", 17],
          ["Viernes", 18],
          ["Sabado", 9],
          ["Domingo", 11],
        ];
        LineChartOptions = {
          hAxis: {
            title: 'Dia',
          },
          vAxis: {
            title: 'No. Ventas',
          },
          series: {
            1: { curveType: 'function' },
          },
          colors: ['red'],
          title: "NUMERO DE VENTAS",
          lineWidth: 3,
          pointSize: 10,
        }

        PieChartOptions = {
          title: 'NUMERO DE VENTAS',
          is3D: true,
        }
        
        break;
      case "Mensual":
        Data = [
          ['Semana', 'No. Ventas'],
          ["Del 1-7", 0],
          ["Del 8-14", 10],
          ["Del 15-21", 23],
          ["Del 22-28", 1],
          ["Del 28++", 2],
        ];
        LineChartOptions = {
          hAxis: {
            title: 'Semana',
          },
          vAxis: {
            title: 'No. Ventas',
          },
          series: {
            1: { curveType: 'function' },
          },
          colors: ['red'],
          title: "NUMERO DE VENTAS",
          lineWidth: 3,
          pointSize: 10,
        }

        PieChartOptions = {
          title: 'NUMERO DE VENTAS',
          is3D: true,
        }

        break;
      case "Anual":
        Data = [
          ['Mes', 'No. Ventas'],
          ["Enero", 0],
          ["Febrero", 10],
          ["Marzo", 23],
          ["Abril", 17],
          ["Mayo", 18],
          ["Junio", 9],
          ["Julio", 11],
          ["Agosto", 12],
          ["Septiembre", 2],
          ["Octubre", 29],
          ["Noviembre", 32],
          ["Diciembre", 60],
        ];
        LineChartOptions = {
          hAxis: {
            title: 'Mes',
          },
          vAxis: {
            title: 'No. Ventas',
          },
          series: {
            1: { curveType: 'function' },
          },
          colors: ['red'],
          title: "NUMERO DE VENTAS",
          lineWidth: 3,
          pointSize: 10,
        }

        PieChartOptions = {
          title: 'NUMERO DE VENTAS',
          is3D: true,
        }
        break;
    }

    return(
      <>
        <div className='reports__contPDF'>
          <button className='reports__btnPDF'><img className="reports__icon" src="https://cdn-icons-png.flaticon.com/512/3143/3143500.png" width="20px" height="20px"/>PDF</button>
        </div>
        <label className='reports__titlGraphics'>NUMERO TOTAL DE VENTAS</label>
        <div className='reports__grapLineChart'>
          <Chart
            width={'700px'}
            height={'410px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={LineDataTotal}
            options={LineChartOptionsTotal}
          /> 
        </div>
        <label className='reports__titlGraphics'>NUMERO DE VENTAS POR FILTRO</label>
        <div className='reports__topGraphics grid'>
          <div className='reports__contFilter'>
            <label>Filtro: </label>
            <Select className='reports__select' options={options} placeholder="Semanal" onChange={e => {setFilter(e.value);}}/>
          </div>
        </div>
        <div className='reports__grapLineChart'>
          <Chart
              width={'700px'}
              height={'410px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={Data}
              options={LineChartOptions}
          /> 
        </div>
        <div className='reports__grapPieChart'>
          <Chart
            width={'700px'}
            height={'410px'}
            chartType="PieChart"
            loader={<div>Loading Pie Chart</div>}
            data={Data}
            options={PieChartOptions}
          />
        </div>
      </>
    )
}

export default GraphicSells;