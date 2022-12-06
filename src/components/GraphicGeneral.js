import Chart from 'react-google-charts'
import {useState} from "react";
import Select from 'react-select'

export function GraphicGeneral(){

    //Datos y opciones para las graficas
    var Data = [];
    var DataPie = [];
    var LineChartOptions = {};
    var PieChartOptions = {};
    const LineDataTotal = [
      ['', 'Total'],
      ["Ventas", 300],
      ["Clientes", 150],
      ["Productos", 1500],
    ];
    const LineChartOptionsTotal = {
      vAxis: {
        title: 'Total',
      },
      colors: ['purple'],
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
          ['Dia', 'Ventas', 'Clientes Registrados', 'Productos Comprados'],
          ["Lunes", 1, 2, 10],
          ["Martes", 10, 11, 2],
          ["Miercoles", 23, 15, 20],
          ["Jueves", 17, 20, 30],
          ["Viernes", 18, 10, 21],
          ["Sabado", 9, 8, 5],
          ["Domingo", 11, 2, 4],
        ];
        LineChartOptions = {
          hAxis: {
            title: 'Dia',
          },
          vAxis: {
            title: 'No. Totales',
          },
          seriesType: "bars",
          series: { 5: { type: "line" } },
          title: "NUMEROS TOTALES",
          colors: ['#F59449', '#EB5EEB', '#548EAB']
        }

        DataPie = [
          ['Categoria', 'Total'],
          ["Ventas", 1],
          ["Usuarios", 10],
          ["Productos", 23],
        ];
        PieChartOptions = {
          title: 'NUMEROS TOTALES DE LA SEMANA',
          is3D: true,
        }
        
        break;
      case "Mensual":
        Data = [
          ['Semana', 'Ventas', 'Clientes Registrados', 'Productos Comprados'],
          ["Del 1-7", 0, 12, 43],
          ["Del 8-14", 10, 32,1],
          ["Del 15-21", 23, 42, 40],
          ["Del 22-28", 1, 11, 11],
          ["Del 28++", 2, 23, 42],
        ];
        LineChartOptions = {
          hAxis: {
            title: 'Semana',
          },
          vAxis: {
            title: 'No. Totales',
          },
          seriesType: "bars",
          series: { 5: { type: "line" } },
          title: "NUMEROS TOTALES",
          colors: ['#F59449', '#EB5EEB', '#548EAB']
        }

        DataPie = [
          ['Categoria', 'Total'],
          ["Ventas", 10],
          ["Usuarios", 12],
          ["Productos", 20],
        ];
        PieChartOptions = {
          title: 'NUMEROS TOTALES DEL MES',
          is3D: true,
        }

        break;
      case "Anual":
        Data = [
          ['Mes', 'Ventas', 'Clientes Registrados', 'Productos Comprados'],
          ["Enero", 0, 12, 12],
          ["Febrero", 10, 23, 42],
          ["Marzo", 23, 23, 23],
          ["Abril", 17, 42, 12],
          ["Mayo", 18, 100, 21],
          ["Junio", 9, 9 ,9],
          ["Julio", 11, 11, 10],
          ["Agosto", 12, 21, 34],
          ["Septiembre", 2, 10, 10],
          ["Octubre", 29, 53, 12],
          ["Noviembre", 32, 49, 12],
          ["Diciembre", 60, 39, 39],
        ];
        LineChartOptions = {
          hAxis: {
            title: 'Mes',
          },
          vAxis: {
            title: 'No. Totales',
          },
          seriesType: "bars",
          series: { 5: { type: "line" } },
          title: "NUMEROS TOTALES",
          colors: ['#F59449', '#EB5EEB', '#548EAB']
        }

        DataPie = [
          ['Categoria', 'Total'],
          ["Ventas", 100],
          ["Clientes Registrados", 20],
          ["Productos Comprados", 230],
        ];
        PieChartOptions = {
          title: 'NUMEROS TOTALES DEL AÑO',
          is3D: true,
        }
        break;
    }

    return(
      <>
        <div className='reports__contPDF'>
          <button className='reports__btnPDF'><img className="reports__icon" src="https://cdn-icons-png.flaticon.com/512/3143/3143500.png" width="20px" height="20px"/>PDF</button>
        </div>
        <label className='reports__titlGraphics'>NUMEROS TOTALES</label>
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
        <label className='reports__titlGraphics'>NUMEROS TOTALES POR FILTRO</label>
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
              chartType="ComboChart"
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
            data={DataPie}
            options={PieChartOptions}
          />
        </div>
      </>
    )
}

export default GraphicGeneral;