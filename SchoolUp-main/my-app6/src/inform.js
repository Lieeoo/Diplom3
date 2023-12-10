import './ProjectCSS.css';

function inform () {
	return (

		<div className="St">
			<h2>Бызова Мария Алексеевна</h2>
			<p>женский, учится</p>
			<div className="TextBox">
				<p>Состояние семьи: полная</p>
				<p>Детей в семье: 1</p>
				<p>Достаток семьи: средний</p>
				<p>Образовательный уровень родителей: высшее</p>
				<p>Занятость родителей: ИП</p>
				</div>
			<p>Дополнительное образование</p>
			<div className="TextBox2">
				<div className="TextBox3">
					<div className="TextBox4"> учреждение </div>
					<div className="TextBox4"> направление </div>
					<div className="TextBox4"> программа </div>
					<div className="TextBox4"> ПФДО </div>
					</div>
				<div className="TextBox3">
					<div className="TextBox4"> МБОУ "СОШ №11" </div>
					<div className="TextBox4"> техническое </div>
					<div className="TextBox4"> "фиксики" </div>
					<div className="TextBox4"> 785735572 </div>
					</div>
				</div>
			<a href="src/components/ui/ClassroomLayouts/ClassroomEditStudent/ClassroomEditStudent.jsx">
				<button className="TBVR"> Редактировать </button> 
				</a>
				</div>

	)
}

export default inform;