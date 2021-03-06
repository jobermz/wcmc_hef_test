<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="s" uri="/struts-tags"%>

<div class="page-content" id="idDivPrincipalCapasBase">
	<div class="row">
		<div class="page-title">
			<h3>
				Gestionar <span class="semi-bold">Capas base</span> 
			</h3>
		</div>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-male"></i> Hef</a></li>
			<li><a href="home.action"><i class="fa fa-star"></i> Principal </a></li>
			<li class="active"><i class="fa fa-edit"></i> Capas base</li>
		</ol>
	</div>
	<div class="row">
		<div class="grid simple">
			
			<div class="grid-title">
				<div class="row form-row">
					<div class="col-sm-12">
						<div class="botonera">
							<button class="btn btn-primary" type="button" id="idBtnNuevoCapasBase" tabindex="10"><i class="fa fa-file-o"></i> Nuevo </button>
							<button class="btn btn-primary" type="button" id="idBtnSalirCapasBase" tabindex="10"><i class="fa fa-power-off"></i> Salir </button>
						</div>
					</div>
				</div>
			</div>
			
			<div class="grid-body no-border">
				<form class="" method="POST" id="idFormBuscarCapasBase" name="formBuscarCapasBase" novalidate="novalidate">
					
					<div class="row ">
						<div class="col-sm-12">
							<h4 class="semi-bold"><span class="light">Listado de</span> <span class="semi-bold">Capas base</span><br>
							</h4>
							<div class="row form-row">
								<div class="col-sm-6">
		                			<label for="buscar_strNombre" class="form-label">Nombre</label>
		                			<s:textfield name="buscar_strNombre" cssClass="form-control" tabindex="1" size="40" maxlength="null"/>
								</div>
							</div>
							<div class="row form-row">
								<div class="col-sm-6">
		                			<label for="buscar_strComentarios" class="form-label">Comentarios</label>
		                			<s:textfield name="buscar_strComentarios" cssClass="form-control" tabindex="2" size="40" maxlength="500"/>
								</div>
							</div>


						</div>
					</div>
					
					<div class="row form-row">
						<div class="col-sm-12">
							<div class="botonera">
								<button class="btn btn-primary" type="button" id="idBtnConsultarCapasBase" tabindex="10"><i class="fa fa-filter"></i> Filtrar </button>
								<button class="btn btn-primary" type="button" id="idBtnMostrarTodosCapasBase" tabindex="10"><i class="fa fa-file-o"></i> Mostrar todos </button>
							</div>
						</div>
					</div>
					
				</form>
			</div>
			
			<div class="grid-body no-border">      
				<table cellpadding="0" cellspacing="0" border="0" class="table table-bordered table-hover" id="tableDefaultCapasBase" >
					<thead>     
						<tr>
							<th width="null">Nombre</th>
							<th width="30%">Fecha registro</th>
							<th width="30%">Grupo</th>
							<th style="width: 6%;">Detalle</th>
						</tr>
					</thead>
				</table>
				<br>
			</div>
			
		</div>
	</div>
</div>
<div id="idDivEditarCapasBase"></div>
<div id="dialog-info-eliminar" hidden="true">
    <br>  <p> <strong>&iquest;EST&Aacute; SEGURO QUE DESEA ELIMINAR EL REGISTRO&#63;</strong></p>
</div>

<s:form action="" name="form" id="form" namespace="/">
	<s:hidden name="buscar_seleccion_id" id="buscar_seleccion_id" />
</s:form>
