<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssessmentPartOnesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assessment_part_ones', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('assessment_id')->unsigned();
            $table->foreign('assessment_id')->references('id')->on('assessments')
                ->onDelete('cascade');

            $table->text('personal');
            $table->text('qualifications');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('assessment_part_ones');
    }
}
