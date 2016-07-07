<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAssessmentSupervisorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assessment_supervisors', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('assessment_id')->unsigned();
            $table->foreign('assessment_id')->references('id')->on('assessments')
                ->onDelete('cascade');

            $table->text('attributes');
            $table->text('habit');
            $table->text('leadership');

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
        Schema::drop('assessment_supervisors');
    }
}
