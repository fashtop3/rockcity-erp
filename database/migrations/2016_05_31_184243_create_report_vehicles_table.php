<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//        Schema::create('report_vehicles', function (Blueprint $table) {
//            $table->increments('id');
//
//            $table->integer('report_id')->unsigned();
//            $table->foreign('report_id')
//                ->references('id')->on('reports')
//                ->onDelete('cascade')
//                ->onUpdate('cascade');
//
//            $table->integer('vehicle_id')->unsigned();
//            $table->foreign('vehicle_id')
//                ->references('id')->on('vehicles')
//                ->onDelete('cascade')
//                ->onUpdate('cascade');
//
//            $table->string('driver');
//            $table->string('passenger');
//            $table->string('destination');
//            $table->string('millageBefore');
//            $table->string('millageAfter');
//            $table->string('timeBefore');
//            $table->string('timeAfter');
//            $table->string('fuelBefore');
//            $table->string('fuelAfter');
//            $table->longText('htmlText');
//
//
//            $table->timestamps();
//        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('report_vehicles');
    }
}
